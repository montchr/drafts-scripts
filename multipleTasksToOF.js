// split draft into lines
const lines = draft.content.split("\n");
const baseURL = "omnifocus://x-callback-url/add";

// loop over lines and send each to Fantastical
for(var line of lines) {
	if (line.length == 0) { continue; }
	// create and configure callback object
	var cb = CallbackURL.create();
	cb.baseURL = baseURL;
	cb.addParameter("name", line);
	// open and wait for result
	var success = cb.open();
	if (!success) {
		if (cb.status == "cancel") {
		   context.cancel();
		   break;
		}
		else {
			context.fail();
			break;
		}
	}
}