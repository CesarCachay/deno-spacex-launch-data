import * as log from 'https://deno.land/std/log/mod.ts';
import * as _ from 'https://deno.land/x/lodash@4.17.15-es/lodash.js';

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: Array<string>;
};

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

const launches = new Map<number, Launch>();

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

  // Is possible to do it using for of and forEach. But forEach asks for give the type of launch
  // launchData.forEach((launch: any) => {
  //   const flightData = {
  //     flightNumber: launch.flight_number,
  //     mission: launch.mission_name
  //   };

  //   launches.set(flightData.flightNumber, flightData);

  //   log.info(JSON.stringify(flightData));
  // })

  for (const launch of launchData) {
    const payloads = launch.rocket.second_stage.payloads;
    // flatMap it's really helpfull un functional programming
    const customersData = _.flatMap(payloads, (payload: any) => {
      return payload.customers;
    });

    const flightData = {
      flightNumber: launch.flight_number,
      mission: launch.mission_name,
      rocket: launch.rocket.rocket_name,
      customers: customersData,
    };

    launches.set(flightData.flightNumber, flightData);

    log.info(JSON.stringify(flightData));
  }
};

await downloadLaunchData();