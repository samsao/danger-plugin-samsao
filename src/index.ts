// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from 'danger/distribution/dsl/DangerDSL';
declare var danger: DangerDSLType;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export declare function markdown(message: string): void;

interface Options {
  key: string;
  url: string;
  emoji?: string;
}

export function linkIssue(options: Options): void {
  const { key = '', url = '', emoji = ':link:' } = options || {};

  const issues = extractIssues(danger.github.pr.title, key);

  if (issues.length === 0) {
    warn(`Please add the JIRA issue key to the PR title (e.g. ${key}-123)`);
    return;
  }

  const links = issues.map((issue) => createLink(url + issue, issue));

  message(`${emoji} ${links.join(', ')}`);
}

const createLink = (href: string, text: string): string => `<a href="${href}">${text}</a>`;

const extractIssues = (text: string, key: string) => {
  const regex = new RegExp(`(${key}-[0-9]+)`, 'g');

  let match;
  const issues = [];

  // tslint:disable-next-line:no-conditional-assignment
  while ((match = regex.exec(text)) != null) {
    issues.push(match[0]);
  }

  return issues;
};
