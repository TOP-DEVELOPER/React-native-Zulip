import deepFreeze from 'deep-freeze';

import {
  getUnreadByStream,
  getUnreadStreamTotal,
  getUnreadByPms,
  getUnreadPmsTotal,
  getUnreadByHuddles,
  getUnreadHuddlesTotal,
  getUnreadMentionsTotal,
  getUnreadTotal,
  getUnreadStreamsAndTopics,
} from '../unreadSelectors';

const unreadStreamData = [
  {
    stream_id: 0,
    topic: 'a topic',
    unread_message_ids: [1, 2, 3],
  },
  {
    stream_id: 0,
    topic: 'another topic',
    unread_message_ids: [4, 5],
  },
  {
    stream_id: 2,
    topic: 'some other topic',
    unread_message_ids: [6, 7],
  },
];

const unreadPmsData = [
  {
    sender_id: 0,
    unread_message_ids: [1, 2],
  },
  {
    sender_id: 2,
    unread_message_ids: [3, 4, 5],
  },
];

const unreadHuddlesData = [
  {
    user_ids_string: '1,2,3',
    unread_message_ids: [1, 2],
  },
  {
    user_ids_string: '4,5',
    unread_message_ids: [3, 4, 5],
  },
];

const unreadMentionsData = [1, 2, 3];

describe('getUnreadByStream', () => {
  test('when no items in streams key, the result is an empty object', () => {
    const state = deepFreeze({
      unread: {
        streams: [],
      },
    });

    const unreadByStream = getUnreadByStream(state);

    expect(unreadByStream).toEqual({});
  });

  test('when there are unread stream messages, returns a list with counts per stream_id ', () => {
    const state = deepFreeze({
      unread: {
        streams: unreadStreamData,
      },
    });

    const unreadByStream = getUnreadByStream(state);

    expect(unreadByStream).toEqual({ '0': 5, '2': 2 });
  });
});

describe('getUnreadStreamTotal', () => {
  test('when no items in "streams" key, there are unread message', () => {
    const state = deepFreeze({
      unread: {
        streams: [],
      },
    });

    const unreadCount = getUnreadStreamTotal(state);

    expect(unreadCount).toEqual(0);
  });

  test('count all the unread messages listed in "streams" key', () => {
    const state = deepFreeze({
      unread: {
        streams: unreadStreamData,
      },
    });

    const unreadCount = getUnreadStreamTotal(state);

    expect(unreadCount).toEqual(7);
  });
});

describe('getUnreadByPms', () => {
  test('when no items in streams key, the result is an empty array', () => {
    const state = deepFreeze({
      unread: {
        pms: [],
      },
    });

    const unreadByStream = getUnreadByPms(state);

    expect(unreadByStream).toEqual({});
  });

  test('when there are unread private messages, returns counts by sender_id', () => {
    const state = deepFreeze({
      unread: {
        pms: unreadPmsData,
      },
    });

    const unreadByStream = getUnreadByPms(state);

    expect(unreadByStream).toEqual({ '0': 2, '2': 3 });
  });
});

describe('getUnreadPmsTotal', () => {
  test('when no items in "pms" key, there are unread private messages', () => {
    const state = deepFreeze({
      unread: {
        pms: [],
      },
    });

    const unreadCount = getUnreadPmsTotal(state);

    expect(unreadCount).toEqual(0);
  });

  test('when there are keys in "pms", sum up all unread private message counts', () => {
    const state = deepFreeze({
      unread: {
        pms: unreadPmsData,
      },
    });

    const unreadCount = getUnreadPmsTotal(state);

    expect(unreadCount).toEqual(5);
  });
});

describe('getUnreadByHuddles', () => {
  test('when no items in streams key, the result is an empty array', () => {
    const state = deepFreeze({
      unread: {
        huddles: [],
      },
    });

    const unreadByStream = getUnreadByHuddles(state);

    expect(unreadByStream).toEqual({});
  });

  test('when there are unread stream messages, returns a ', () => {
    const state = deepFreeze({
      unread: {
        huddles: unreadHuddlesData,
      },
    });

    const unreadByStream = getUnreadByHuddles(state);

    expect(unreadByStream).toEqual({ '1,2,3': 2, '4,5': 3 });
  });
});

describe('getUnreadHuddlesTotal', () => {
  test('when no items in "huddles" key, there are unread group messages', () => {
    const state = deepFreeze({
      unread: {
        huddles: [],
      },
    });

    const unreadCount = getUnreadHuddlesTotal(state);

    expect(unreadCount).toEqual(0);
  });

  test('when there are keys in "huddles", sum up all unread group message counts', () => {
    const state = deepFreeze({
      unread: {
        huddles: unreadHuddlesData,
      },
    });

    const unreadCount = getUnreadHuddlesTotal(state);

    expect(unreadCount).toEqual(5);
  });
});

describe('getUnreadMentionsTotal', () => {
  test('unread mentions count is equal to the unread array length', () => {
    const state = deepFreeze({
      unread: {
        mentions: [1, 2, 3],
      },
    });

    const unreadCount = getUnreadMentionsTotal(state);

    expect(unreadCount).toEqual(3);
  });
});

describe('getUnreadTotal', () => {
  test('if no key has any items then no unread messages', () => {
    const state = deepFreeze({
      unread: {
        streams: [],
        pms: [],
        huddles: [],
        mentions: [],
      },
    });

    const unreadCount = getUnreadTotal(state);

    expect(unreadCount).toEqual(0);
  });

  test('calculates total unread of streams + pms + huddles', () => {
    const state = deepFreeze({
      unread: {
        streams: unreadStreamData,
        pms: unreadPmsData,
        huddles: unreadHuddlesData,
        mentions: unreadMentionsData,
      },
    });

    const unreadCount = getUnreadTotal(state);

    expect(unreadCount).toEqual(20);
  });
});

describe('getUnreadStreamsAndTopics', () => {
  test('if no key has any items then no unread messages', () => {
    const state = deepFreeze({
      subscriptions: [],
      unread: {
        streams: [],
      },
    });

    const unreadCount = getUnreadStreamsAndTopics(state);

    expect(unreadCount).toEqual([]);
  });

  test('group data by stream and topics inside, count unread', () => {
    const state = deepFreeze({
      subscriptions: [
        {
          stream_id: 0,
          name: 'stream 0',
          color: 'red',
        },
        {
          stream_id: 2,
          name: 'stream 2',
          color: 'blue',
        },
      ],
      unread: {
        streams: unreadStreamData,
      },
    });

    const unreadCount = getUnreadStreamsAndTopics(state);

    expect(unreadCount).toEqual([
      {
        key: 'stream 0',
        streamName: 'stream 0',
        color: 'red',
        unread: 5,
        data: [
          { key: 'a topic', topic: 'a topic', unread: 3 },
          { key: 'another topic', topic: 'another topic', unread: 2 },
        ],
      },
      {
        key: 'stream 2',
        streamName: 'stream 2',
        color: 'blue',
        unread: 2,
        data: [{ key: 'some other topic', topic: 'some other topic', unread: 2 }],
      },
    ]);
  });

  test('both streams and topics are sorted alphabetically, case-insensitive', () => {
    const state = deepFreeze({
      subscriptions: [
        {
          stream_id: 2,
          color: 'green',
          name: 'def stream',
        },
        {
          stream_id: 1,
          color: 'blue',
          name: 'xyz stream',
        },
        {
          stream_id: 0,
          color: 'red',
          name: 'abc stream',
        },
      ],
      unread: {
        streams: [
          {
            stream_id: 0,
            topic: 'z topic',
            unread_message_ids: [1, 2, 3],
          },
          {
            stream_id: 0,
            topic: 'a topic',
            unread_message_ids: [4, 5],
          },
          {
            stream_id: 2,
            topic: 'b topic',
            unread_message_ids: [6, 7],
          },
          {
            stream_id: 2,
            topic: 'c topic',
            unread_message_ids: [7, 8],
          },
          {
            stream_id: 1,
            topic: 'e topic',
            unread_message_ids: [10],
          },
          {
            stream_id: 1,
            topic: 'd topic',
            unread_message_ids: [9],
          },
        ],
      },
    });

    const unreadCount = getUnreadStreamsAndTopics(state);

    expect(unreadCount).toEqual([
      {
        key: 'abc stream',
        streamName: 'abc stream',
        color: 'red',
        unread: 5,
        data: [
          { key: 'a topic', topic: 'a topic', unread: 2 },
          { key: 'z topic', topic: 'z topic', unread: 3 },
        ],
      },
      {
        key: 'def stream',
        streamName: 'def stream',
        color: 'green',
        unread: 4,
        data: [
          { key: 'b topic', topic: 'b topic', unread: 2 },
          { key: 'c topic', topic: 'c topic', unread: 2 },
        ],
      },
      {
        key: 'xyz stream',
        streamName: 'xyz stream',
        color: 'blue',
        unread: 2,
        data: [
          { key: 'd topic', topic: 'd topic', unread: 1 },
          { key: 'e topic', topic: 'e topic', unread: 1 },
        ],
      },
    ]);
  });
});
