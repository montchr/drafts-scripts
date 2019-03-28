/* global CallbackURL, context */
/* eslint-disable no-console, no-unused-vars */

function SendToOmniFocus(content, options = {}) {
  let cbContent;

  const defaults = {
    project: '',
    tags: [],
    successMessage: '',
    edit: false,
  };
  const actualOptions = Object.assign({}, defaults, options);
  const {
    project, tags, successMessage, edit,
  } = actualOptions;

  const cb = CallbackURL.create();
  const lines = content.split('\n');

  lines.forEach((line) => {
    // Convert to TaskPaper format
    cbContent = `- ${line}`;

    if (tags.length > 0) {
      cbContent += ` @tags(${tags.toString()})`;
    }

    if (edit) {
      cb.baseURL = 'omnifocus:///add';
      cb.addParameter('name', cbContent);
    } else {
      const target = `/task/${encodeURI(project)}`;
      cb.baseURL = 'omnifocus:///paste';
      cb.addParameter('target', target);
      cb.addParameter('content', cbContent);
    }

    const success = cb.open();
    if (success) {
      if (successMessage) console.log(successMessage);
    } else {
      console.log(cb.status);
      if (cb.status === 'cancel') {
        context.cancel();
      } else {
        context.fail();
      }
    }
  });
}
