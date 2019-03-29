/* global draft */

/**
 * Format the draft content as a quote with optional attribution and title
 *
 * The last line will be interpreted as attribution, but only if prefixed with
 * a dash.
 *
 * With a draft content like this:
 *
 * ```
 * Optional title (leave blank for no title)
 *
 * Here's some text to be interpreted as a quote.
 *
 * There can be multiple lines.
 *
 * - Attribution
 * ```
 *
 * You should get content that looks like this:
 *
 * ```md
 * Optional title (leave blank for no title)
 *
 * > Here's some text to be interpreted as a quote.
 *
 * > There can be multiple lines.
 *
 * —Attribution
 * ```
 *
 * @author Chris Montgomery <chris@montchr.io>
 */

const lines = draft.content.split('\n');
draft.content = lines.map((line, i) => {
  // Leave the Title and blank lines untouched
  if (i === 0 || line === '') return line;
  // Prepare the Attribution
  if (i === lines.length - 1 && line.slice(0, 2) === '- ' && lines[i - 1] === '') {
    return `— ${line}`;
  }
  // All others should be blockquotes
  return `> ${line}`;
});
