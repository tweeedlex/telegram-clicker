const {Api, TelegramClient} = require("telegram");
const {StringSession} = require("telegram/sessions");
const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const input = require("input")

let previousResult = null;

// async function createTelegramClient(db) {
//   const {TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_SESSION_STRING, TELEGRAM_CHANNEL} = process.env;
//   const session = new StringSession("");
//   const client = new TelegramClient(session, +TELEGRAM_API_ID, TELEGRAM_API_HASH, {});
//
//   await client.start({
//     phoneNumber: async () => await input.text("Enter your phone number:"),
//     password: async () => await input.text("Enter your password:"),
//     phoneCode: async () => await input.text("Enter the code you received:")
//   })
//   console.log(client.session.save())
//
//   // await client.connect();
//   // setInterval(() => {
//   //   getChannelLogs(client, db, TELEGRAM_CHANNEL);
//   // }, 10 * 1000);
// }

async function createTelegramClient(db) {
  const {TELEGRAM_API_ID, TELEGRAM_API_HASH, TELEGRAM_SESSION_STRING, TELEGRAM_CHANNEL} = process.env;
  const session = new StringSession(TELEGRAM_SESSION_STRING);
  const client = new TelegramClient(session, +TELEGRAM_API_ID, TELEGRAM_API_HASH, {});

  await client.connect();
  setInterval(() => {
    getChannelLogs(client, db, TELEGRAM_CHANNEL);
  }, 10 * 1000);
}

const getChannelLogs = async (client, db, channel) => {
  const result = await fetchChannelLogs(client, channel);

  const events = result.events;
  if (lodash.isEqual(events, previousResult)) {
    return;
  }
  const joinedUsers = getJoinedUsers(events);
  const leftUsers = getLeftUsers(events, joinedUsers);

  try {
    await insertJoinedUsers(db, joinedUsers);
  } catch (error) {
    handleInsertError(error);
  }

  await deleteLeftUsers(db, leftUsers);

  previousResult = events;
};

const fetchChannelLogs = async (client, channel) => {
  return await client.invoke(
    new Api.channels.GetAdminLog({
      channel,
      q: "",
      maxId: 0,
      minId: 0,
      eventsFilter: new Api.ChannelAdminLogEventsFilter({
        join: true,
        leave: true,
      }),
    })
  );
};

const getJoinedUsers = (events) => {
  const joinedUsers = Array.from(
    events.filter((e) => e.action.className === "ChannelAdminLogEventActionParticipantJoin")
    .reduce((acc, event) => {
      const userId = +event.userId;
      const date = +event.date;
      if (!acc.has(userId) || acc.get(userId) < date) {
        acc.set(userId, date);
      }
      return acc;
    }, new Map())
    .entries()
  ).map(([userId, date]) => ({userId, date}));

  console.log("getJoinedUsers", joinedUsers)
  return joinedUsers
};

const getLeftUsers = (events, joinedUsers) => {
  const leftUsers = events
    .filter((e) => e.action.className === "ChannelAdminLogEventActionParticipantLeave")
    .map((event) => ({ date: +event.date, userId: +event.userId }))
    .filter((leftUser) => {
      const joinUser = joinedUsers.find((joinUser) => joinUser.userId === leftUser.userId);
      return !joinUser || leftUser.date > joinUser.date;
    });

  console.log("getLeftUsers", leftUsers)
  return leftUsers;
};

const insertJoinedUsers = async (db, joinedUsers) => {
  if (joinedUsers.length > 0) {
    await db.Subscriber.insertMany(joinedUsers, {ordered: false});
  }
};

const deleteLeftUsers = async (db, leftUsers) => {
  if (leftUsers.length > 0) {
    await db.Subscriber.deleteMany({userId: {$in: leftUsers.map((u) => u.userId)}});
  }
};

const handleInsertError = (error) => {
  if (!(error.name === "BulkWriteError" && error.code === 11000)) {
    console.error("Error inserting joined users:", error);
  }
};

module.exports = createTelegramClient;