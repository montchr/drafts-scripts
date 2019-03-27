/* global CallbackURL, cancel, context, editor, Prompt */

/**
 * Adds the Draft as TaskPaper content to OmniFocus
 */

function handleCallbackOpen(cb) {
  const success = cb.open();
  if (success) {
    console.log('Taskpaper added to OF');
  } else {
    console.log(cb.status);
    if (cb.status == 'cancel') {
      context.cancel();
    } else {
      context.fail();
    }
  }
}

function catchPromptSelect(prompt) {
  const didSelect = prompt.show();
  if (didSelect === false) {
    cancel('User cancelled the script');
  }
}

function OFCallback(content, project, tags) {
  let cbContent = content;
  const cb = CallbackURL.create();
  const target = `/task/${encodeURI(project)}`;

  if (tags.length > 0) {
    cbContent += ` @tags(${tags.toString()})`;
  }

  cb.baseURL = 'omnifocus:///paste';
  cb.addParameter('target', target);
  cb.addParameter('content', cbContent);

  return cb;
}

const content = editor.getText();
const tags = [];

const prompt = Prompt.create();
prompt.addButton('Music');
prompt.addButton('General');
prompt.addButton('Reading');
prompt.addButton('Restaurants');
catchPromptSelect(prompt);

if (prompt.buttonPressed === 'Groceries') {
  tags.push('groceries');
}

const cb = OFCallback(content, 'Investigate : Music Collection', tags);
handleCallbackOpen(cb);
