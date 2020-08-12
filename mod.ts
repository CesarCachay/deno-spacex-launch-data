import * as log from 'https://deno.land/std/log/mod.ts';

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('DEBUG'),
  },
  loggers: {
    default: {
      // level: 'WARNING', //only display log.warning
      level: 'DEBUG', // this one shows all levels
      handlers: ['console', 'file']
    }
  }
})

const downloadLaunchData = async () => {
  log.info('Downloading launch data ...');
  // log.warning('THIS IS WARNING!'); // it's shown when is warning or debug
  const response = await fetch('https://api.spacexdata.com/v3/launches', {
    method: 'GET',
  });

  if (!response.ok) {
    log.warning('Problem downloading data found ...');
    throw new Error('Launch data download failed!');
  }
  const launchData = await response.json();
  console.log(launchData);
};

await downloadLaunchData();