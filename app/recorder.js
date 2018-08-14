const Minimatch = require('minimatch').Minimatch;

module.exports = app => (name, options = {}) => {
  let only;

  app.locals.recording = true;
  if (!name) throw new Error('Must provide a recording name.');

  app.log(['serve', 'record'], name);

  if (options.only) {
    // if only is truthy, assume it is a glob pattern
    const mm = new Minimatch(options.only);
    only = mm.match.bind(mm);
    app.log(['serve', 'record', 'only'], mm.pattern);
  }

  app.locals.recordMeta = {
    name,
    options,
    only
  };

  // Store whether we're proxying so we can reset it later.
  app.locals.proxyingBeforeRecording = app.locals.proxying;

  // We must proxy in order to record.
  app.proxy();
};
