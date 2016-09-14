
const injectTapEventPlugin = require('react-tap-event-plugin');

// Some components use react-tap-event-plugin to listen for touch events
// because onClick is not fast enough. This dependency is temporary and will eventually go away.
// Until then, be sure to inject this plugin at the start of your app.
//
// Needed for onTouchTap: http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
