import { linkIssue } from '../src';

declare const global: any;

describe('linkIssue()', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.message = jest.fn();
  });

  afterEach(() => {
    global.danger = undefined;
    global.warn = undefined;
    global.message = undefined;
  });

  it('adds the JIRA issue link', () => {
    global.danger = {
      github: { pr: { title: '[ABC-123] Title' } },
    };

    linkIssue({
      key: 'ABC',
      url: 'https://samsao.atlassian.net/browse/',
    });

    expect(global.message).toHaveBeenCalledWith(
      ':link: <a href="https://samsao.atlassian.net/browse/ABC-123">ABC-123</a>',
    );
  });

  it('accepts parenthesis', () => {
    global.danger = {
      github: { pr: { title: '(ABC-123) Title' } },
    };

    linkIssue({
      key: 'ABC',
      url: 'https://samsao.atlassian.net/browse/',
    });

    expect(global.message).toHaveBeenCalledWith(
      ':link: <a href="https://samsao.atlassian.net/browse/ABC-123">ABC-123</a>',
    );
  });

  it('accepts no delimitations', () => {
    global.danger = {
      github: { pr: { title: 'ABC-123 Title' } },
    };

    linkIssue({
      key: 'ABC',
      url: 'https://samsao.atlassian.net/browse/',
    });

    expect(global.message).toHaveBeenCalledWith(
      ':link: <a href="https://samsao.atlassian.net/browse/ABC-123">ABC-123</a>',
    );
  });

  it('accepts multiple issues', () => {
    global.danger = {
      github: { pr: { title: '[ABC-1, ABC-2, ABC-3] Title' } },
    };

    linkIssue({
      key: 'ABC',
      url: 'https://samsao.atlassian.net/browse/',
    });

    expect(global.message).toHaveBeenCalledWith(
      ':link: <a href="https://samsao.atlassian.net/browse/ABC-1">ABC-1</a>, <a href="https://samsao.atlassian.net/browse/ABC-2">ABC-2</a>, <a href="https://samsao.atlassian.net/browse/ABC-3">ABC-3</a>',
    );
  });

  it('warns if JIRA issue is missing', () => {
    global.danger = {
      github: { pr: { title: 'Title' } },
    };

    linkIssue({
      key: 'ABC',
      url: 'https://samsao.atlassian.net/browse/',
    });

    expect(global.warn).toHaveBeenCalledWith(
      'Please add the JIRA issue key to the PR title (e.g. ABC-123)',
    );
  });
});
