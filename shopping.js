/* global CallbackURL, cancel, context, editor, Prompt */

const MY_STORES = [
  'amazon',
  'cousins',
  'fine fare',
  'hardware',
  'liberty choice',
  'pharmacy',
  'spring garden market',
  'whole foods',
];

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

function createOmniFocusCallback(content, project, tags) {
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
let tags = [];

const prompt = Prompt.create();
prompt.addButton('Groceries');
prompt.addButton('General Shopping');
catchPromptSelect(prompt);

if (prompt.buttonPressed === 'Groceries') {
  tags.push('groceries');
}

// Prompt the user to select stores and add the stores to tags
const storesPrompt = Prompt.create();
storesPrompt.addSelect('store', 'Choose Stores:', MY_STORES, [], true);
storesPrompt.addButton('Submit');
catchPromptSelect(storesPrompt);
console.log(storesPrompt);

const selectedStores = storesPrompt.fieldValues;
console.log(selectedStores);

if (selectedStores.length > 0) {
  tags = tags.concat(selectedStores);
}

console.log(tags);

const cb = createOmniFocusCallback(content, 'Shopping', tags);
handleCallbackOpen(cb);
