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
const lastLine = lines[lines.length - 1];
const secondToLastLine = lines[lines.length - 2];

// Find an attribution line and save it as the `attribution` template tag
let attributionLine = '';
const isAttribution = line => line.slice(0, 2) === '- ';
if (isAttribution(lastLine) && secondToLastLine === '') {
  attributionLine = lastLine;
} else if (lastLine === '' && isAttribution(secondToLastLine) && lines[lines.length - 3] === '') {
  attributionLine = secondToLastLine;
}
const attribution = attributionLine.replace(/^(- )/, '');
draft.setTemplateTag('attribution', attribution);

const newContent = lines.map((line, i) => {
  // Leave the Title and blank lines untouched
  if (i === 0 || line === '') return line;
  // Prepare the Attribution
  if (line === attributionLine) {
    return `— ${attribution}`;
  }
  // All others should be blockquotes
  return `> ${line}`;
});

draft.content = newContent.join('\n');
