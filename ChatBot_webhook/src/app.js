const express = require('express')
const axios = require('axios');
var config = require('./config.json');

const { WebhookClient } = require('dialogflow-fulfillment')
const { Card, Suggestion } = require('dialogflow-fulfillment');
const { Suggestions } = require('actions-on-google');
const { Carousel, Image } = require('actions-on-google');
const { BrowseCarousel, BrowseCarouselItem } = require('actions-on-google');


const app = express()

app.get('/', (req, res) => res.send('online'))
app.post('/dialogflow', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  function welcome (agent) {
    agent.requestSource = "ACTIONS_ON_GOOGLE";
    let conv = agent.conv();
    conv.ask('Hi! I am bot and I am virtual assistant of Win Supply. Please choose an option');
    conv.ask(new Suggestions(['View Products', 'Vendor Relations']));
    agent.add(conv);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }


  async function browseCarousel(agent, product_name, color, company) {

    agent.requestSource = "ACTIONS_ON_GOOGLE";
    console.log(color + ' ' + company);

    const url = `${config.solr_url}%22${product_name}%22AND(%22${color}%22OR%22${company}%22)`;
    console.log(url);

    let res = await axios.get(url);
    //let res = await axios.get(`http://18.215.231.105:8983/solr/winsupply/select?q=%22${product_name}%22AND(%22${color}%22OR%22${company}%22)`);

    const result = res.data.response.docs;
    console.log(result[0].product_name);

    let conv = agent.conv();
    conv.ask(`Here are the best match I found for you`);

    conv.ask(new BrowseCarousel({
      items: [
        new BrowseCarouselItem({
          title: result[0].product_name,
          url: result[0].url_link,
          image: new Image({
            url: result[0].image_link,
            alt: result[0].product_name,
          }),

        }),
        new BrowseCarouselItem({
          title: result[1].product_name,
          url: result[1].url_link,
          image: new Image({
            url: result[1].image_link,
            alt: result[1].product_name,
          }),
        }),
      ],
    }));
    agent.add(conv);
  }

  async function bathroomfaucet_color_manufacturer(agent) {

    const color = agent.context.get('bathroomfaucet-color-followup').parameters.color;
    const company = agent.parameters.manufacturer;
    const product_name = 'bathroom faucets';

    await browseCarousel(agent, product_name, color, company);
  }

  async function bathroomsink_color_manufacturer(agent) {

    const color = agent.context.get('bathroomsink-color-followup').parameters.color;
    const company = agent.parameters.manufacturer;
    const product_name = 'bathroom sinks';

    await browseCarousel(agent, product_name, color, company);
  }



  async function kitchenfaucet_color_manufacturer(agent) {

   const color = agent.context.get('kitchenfaucet-color-followup').parameters.color;
   const company = agent.parameters.manufacturer;
   const product_name = 'kitchen faucets';

   await browseCarousel(agent, product_name, color, company);
 }
 async function kitchensink_color_manufacturer(agent) {

   const color = agent.context.get('kitchensink-color-followup').parameters.color;
   const company = agent.parameters.manufacturer;
   const product_name = 'kitchen sinks';

   await browseCarousel(agent, product_name, color, company);
 }
 async function kitchenwaterdispenser_color_manufacturer(agent) {

   const color = agent.context.get('kitchenwaterdispenser-color-followup').parameters.color;
   const company = agent.parameters.manufacturer;
   const product_name = 'kitchen water dispensers';

   await browseCarousel(agent, product_name, color, company);
 }
 async function showerandtubfaucet_color_manufacturer(agent) {

   const color = agent.context.get('showerandtubfaucet-color-followup').parameters.color;
   const company = agent.parameters.manufacturer;
   const product_name = 'shower and tub faucets';

   await browseCarousel(agent, product_name, color, company);
 }
 async function waterfiltration_color_manufacturer(agent) {

   const color = agent.context.get('waterfiltration-color-followup').parameters.color;
   const company = agent.parameters.manufacturer;
   const product_name = 'water filtration';

   await browseCarousel(agent, product_name, color, company);
 }
 async function watersoftening_color_manufacturer(agent) {

   const color = agent.context.get('watersoftening-color-followup').parameters.color;
   const company = agent.parameters.manufacturer;
   const product_name = 'water softening';

   await browseCarousel(agent, product_name, color, company);
 }


// Pipes and fittings details

async function pipe_material_manufacturer(agent) {

 const color = agent.context.get('pipe-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'pipe';

 await browseCarousel(agent, product_name, color, company);
}
async function dielectricPipeFitting_material_manufacturer(agent) {

 const color = agent.context.get('dielectricpipefitting-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'dielectric pipe fittings';

 await browseCarousel(agent, product_name, color, company);
}
async function flexiblePipeFitting_material_manufacturer(agent) {

 const color = agent.context.get('flexiblepipefitting-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'flexible pipe fittings';

 await browseCarousel(agent, product_name, color, company);
}
async function barbedTubeFitting_material_manufacturer(agent) {

 const color = agent.context.get('barbedtubefitting-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'barbed tube fittings';

 await browseCarousel(agent, product_name, color, company);
}
async function compressionTubeFitting_material_manufacturer(agent) {

 const color = agent.context.get('compressiontubefitting-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'compression tube fittings';

 await browseCarousel(agent, product_name, color, company);
}
async function flaredTubeFitting_material_manufacturer(agent) {

 const color = agent.context.get('flaredtubefitting-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'flared tube fittings';

 await browseCarousel(agent, product_name, color, company);
}
async function tubing_material_manufacturer(agent) {

 const color = agent.context.get('tubing-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'tubing';

 await browseCarousel(agent, product_name, color, company);
}

// Valve product details

async function butterflyValve_material_manufacturer(agent) {

 const color = agent.context.get('butterflyvalve-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'butterfly valves';

 await browseCarousel(agent, product_name, color, company);
}
async function ballValve_material_manufacturer(agent) {

 const color = agent.context.get('ballvalve-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'ball valves';

 await browseCarousel(agent, product_name, color, company);
}
async function sillcock_material_manufacturer(agent) {

 const color = agent.context.get('sillcock-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'sillcocks';

 await browseCarousel(agent, product_name, color, company);
}
async function supplystopValve_material_manufacturer(agent) {

 const color = agent.context.get('supplystopvalve-material-followup').parameters.material;
 const company = agent.parameters.manufacturer;
 const product_name = 'supply stop valves';

 await browseCarousel(agent, product_name, color, company);
}
// Async functions for Gas Water heaters
async function residentialGasWaterHeaters_capacity_manufacturer(agent) {

 const color = agent.context.get('residentialgaswaterheaters-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'residential gas water heaters';

 await browseCarousel(agent, product_name, color, company);
}
async function residentialElectricWaterHeaters_capacity_manufacturer(agent) {

 const color = agent.context.get('residentialelectricwaterheaters-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'residential electric water heaters';

 await browseCarousel(agent, product_name, color, company);
}
async function residentialHybridWaterHeaters_capacity_manufacturer(agent) {

 const color = agent.context.get('residentialhybridwaterheaters-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'residential hybrid water heaters';

 await browseCarousel(agent, product_name, color, company);
}
async function commercialElectricWaterHeaters_capacity_manufacturer(agent) {

 const color = agent.context.get('commercialelectricwaterheaters-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'commercial electric water heaters';

 await browseCarousel(agent, product_name, color, company);
}
async function commercialGasWaterHeater_capacity_manufacturer(agent) {

 const color = agent.context.get('commercialgaswaterheater-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'commercial gas water heaters';

 await browseCarousel(agent, product_name, color, company);
}
async function waterHeaterStorageTanks_capacity_manufacturer(agent) {

 const color = agent.context.get('waterheaterstoragetanks-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'water heater storage tanks';

 await browseCarousel(agent, product_name, color, company);
}

async function residentialAirHandlers_capacity_manufacturer(agent) {

 const color = agent.context.get('residentialairhandlers-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'residential air handlers';

 await browseCarousel(agent, product_name, color, company);
}
async function residentialHVACCondensers_capacity_manufacturer(agent) {

 const color = agent.context.get('residentialhvaccondensers-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'residential hvac condensers';

 await browseCarousel(agent, product_name, color, company);
}
async function commercialEquipment_capacity_manufacturer(agent) {

 const color = agent.context.get('commercialequipment-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'commercial equipment';

 await browseCarousel(agent, product_name, color, company);
}
async function commercialSystems_capacity_manufacturer(agent) {

 const color = agent.context.get('commercialsystems-capacity-followup').parameters.number;
 const company = agent.parameters.manufacturer;
 const product_name = 'commercial systems';

 await browseCarousel(agent, product_name, color, company);
}
async function oilBoilers_manufacturer(agent) {

 const color = 'None';
 const company = agent.parameters.manufacturer;
 const product_name = 'oil boilers';

 await browseCarousel(agent, product_name, color, company);
}
async function gasBoilers_manufacturer(agent) {

 const color = 'None';
 const company = agent.parameters.manufacturer;
 const product_name = 'gas boilers';

 await browseCarousel(agent, product_name, color, company);
}

//hybrid intents
async function hybridcolbathroomfaucet_manufacturer(agent) {

    const color = agent.context.get('hybridcolbathroomfaucet-followup').parameters.color;
    const company = agent.parameters.manufacturer;
    const product_name = 'bathroom faucets';

    await browseCarousel(agent, product_name, color, company);
  }

async function hybridmanubathroomfaucet_color(agent) {

    const company = agent.context.get('hybridmanubathroomfaucet-followup').parameters.manufacturer;
    const color = agent.parameters.color;
    const product_name = 'bathroom faucets';

    await browseCarousel(agent, product_name, color, company);
}
async function hybridcolmanubathroomfaucet(agent) {

    const company = agent.parameters.manufacturer;
    const color = agent.parameters.color;
    const product_name = 'bathroom faucets';

    await browseCarousel(agent, product_name, color, company);
}

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Default Fallback Intent', fallback);
//intents for Plumbing
  intentMap.set('BathroomFaucet-color-manufacturer', bathroomfaucet_color_manufacturer);
  intentMap.set('BathroomSink-color-manufacturer', bathroomsink_color_manufacturer);
  intentMap.set('KitchenFaucet-color-manufacturer', kitchenfaucet_color_manufacturer);
  intentMap.set('KitchenSink-color-manufacturer', kitchensink_color_manufacturer);
  intentMap.set('KitchenWaterDispenser-color-manufacturer', kitchenwaterdispenser_color_manufacturer);
  intentMap.set('ShowerAndTubFaucet-color-manufacturer', showerandtubfaucet_color_manufacturer);
  intentMap.set('WaterFiltration-color-manufacturer', waterfiltration_color_manufacturer);
  intentMap.set('WaterSoftening-color-manufacturer', watersoftening_color_manufacturer);

//intent for pipes and fittings
  intentMap.set('Pipe-material-manufacturer', pipe_material_manufacturer);
  intentMap.set('DielectricPipeFitting-material-manufacturer', dielectricPipeFitting_material_manufacturer);
  intentMap.set('FlexiblePipeFitting-material-manufacturer', flexiblePipeFitting_material_manufacturer);
  intentMap.set('BarbedTubeFitting-material-manufacturer', barbedTubeFitting_material_manufacturer);
  intentMap.set('CompressionTubeFitting-material-manufacturer', compressionTubeFitting_material_manufacturer);
  intentMap.set('FlaredTubeFitting-material-manufacturer', flaredTubeFitting_material_manufacturer);
  intentMap.set('Tubing-material-manufacturer', tubing_material_manufacturer);

//intent for valves
  intentMap.set('ButterflyValve-material-manufacturer', butterflyValve_material_manufacturer);
  intentMap.set('BallValve-material-manufacturer', ballValve_material_manufacturer);
  intentMap.set('Sillcock-material-manufacturer', sillcock_material_manufacturer);
  intentMap.set('SupplystopValve-material-manufacturer', supplystopValve_material_manufacturer);

//intent for water heaters
  intentMap.set('ResidentialGasWaterHeaters-capacity-manufacturer', residentialGasWaterHeaters_capacity_manufacturer);
  intentMap.set('ResidentialElectricWaterHeaters-capacity-manufacturer', residentialElectricWaterHeaters_capacity_manufacturer);
  intentMap.set('ResidentialHybridWaterHeaters-capacity-manufacturer', residentialHybridWaterHeaters_capacity_manufacturer);
  intentMap.set('CommercialElectricWaterHeaters-capacity-manufacturer', commercialElectricWaterHeaters_capacity_manufacturer);
  intentMap.set('CommercialGasWaterHeater-capacity-manufacturer', commercialGasWaterHeater_capacity_manufacturer);
  intentMap.set('WaterHeaterStorageTanks-capacity-manufacturer', waterHeaterStorageTanks_capacity_manufacturer);

//intent for HVAC
  intentMap.set('ResidentialAirHandlers-capacity-manufacturer', residentialAirHandlers_capacity_manufacturer);
  intentMap.set('ResidentialHVACCondensers-capacity-manufacturer', residentialHVACCondensers_capacity_manufacturer);
  intentMap.set('CommercialEquipment-capacity-manufacturer', commercialEquipment_capacity_manufacturer);
  intentMap.set('CommercialSystems-capacity-manufacturer', commercialSystems_capacity_manufacturer);
  intentMap.set('OilBoilers-manufacturer', oilBoilers_manufacturer);
  intentMap.set('GasBoilers-manufacturer', gasBoilers_manufacturer);

//intent for hybrid comments

intentMap.set('HybridColBathroomFaucet-manufacturer', hybridcolbathroomfaucet_manufacturer)
intentMap.set('HybridManuBathroomFaucet-color', hybridmanubathroomfaucet_color)
intentMap.set('HybridColManuBathroomFaucet', hybridcolmanubathroomfaucet)




  agent.handleRequest(intentMap)
})

module.exports = app
