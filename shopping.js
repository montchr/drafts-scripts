// See online documentation for examples
// http://getdrafts.com/scripting

const draftsContent = editor.getText();
let content = draftsContent;

const p = Prompt.create();
p.addButton("Investigate Music");
p.addButton("Groceries");
p.addButton("General Shopping");

const didSelect = p.show();
if (didSelect === false) {
	cancel("User cancelled the script");
}

const baseURL = "omnifocus:///paste";

let projectName = "";
let tags = [];
switch (p.buttonPressed) {
	case "Investigate Music":
		projectName = "Investigate : Music Collection";
		break;
	case "Groceries":
		projectName = "Shopping";
		tags.push("groceries");
		break;
		
	case "General Shopping":
		projectName = "Shopping";
		break;
}

const target = "/task/" + encodeURI(projectName);

		const stores = [
			"whole foods",
			"fine fare",
			"cousins",
			"liberty choice",
			"spring garden market",
		];
		const storesPrompt = Prompt.create();
		storesPrompt.addSelect("store", "Choose store", [stores], [0]);
		const didSelect = storesPrompt.show();
		if (didSelect === false) {
			cancel("User cancelled the script");
		}
		const selectedStores = storesPrompt.fieldValues;
		console.log(selectedStores);

if (tags.length > 0) {
 	content += ` @tags(${tags.toString()})`;
}

// send this to OmniFocus
const cb = CallbackURL.create();
cb.baseURL = baseURL;
cb.addParameter("target", target);
cb.addParameter("content", content);

// open and wait for result
const success = cb.open();
if (success) {
	console.log("Taskpaper added to OF");
} else {
  	console.log(cb.status);
  	if (cb.status == "cancel") {
		context.cancel();
	} else {
		context.fail();
	}
}