/* =========================================================================
   The Beach School @ Port Dickson · 9–13 Sept 2026
   -------------------------------------------------------------------------
   ALL trip content lives in this file. Edit text freely; app.js renders it.
   - Times are 12-hour strings like "7:15am" (used for the "Now" marker).
   - kind: "bus" | "activity" | "meal" | "stay" | "rest"
   - Meals: pay: "han" (included) | "own" (own payment, bring Ringgit)
   - steps: optional timed sub-items inside an activity.
   ========================================================================= */
window.TRIP = {
  name: "The Beach School",
  place: "Port Dickson",
  start: "2026-09-09",
  end: "2026-09-13",
  updated: "6 Sept 2026",
  disclaimer:
    "Because of the nature of the activities, everything is subject to weather, which can be unpredictable. The organisers reserve the right to adjust activities for the safety of the group.",

  keyInfo: [
    {
      icon: "bus",
      title: "The bus",
      lines: [
        "Wed 9 Sept · pick-up from each family's home in Singapore. First stop 6:30am (2 stops, 4 pax).",
        "Sun 13 Sept · 9:00am pick-up at Vista Asana (7 pax), ETA Singapore 4:00pm, drop-off at each family's home.",
        "Have your own breakfast before boarding on Wednesday."
      ]
    },
    {
      icon: "home",
      title: "Where we stay",
      lines: [
        "We move house Saturday morning: check-out at 11:00am."
      ],
      places: [
        { name: "Wed 9 – Sat 12 · AirBnB Ola Mutiara",
          address: "3810, Jalan Siakap 1, Taman Pantai Dickson, 71050 Port Dickson, Negeri Sembilan, Malaysia" },
        { name: "Sat 12 – Sun 13 · AirBnB Vista Asana",
          address: "165, Lot 3808 Jalan Siakap 1, Taman Peranginan Mutiara, Taman Pantai Dickson, 71050 Port Dickson, Negeri Sembilan, Malaysia" }
      ]
    },
    {
      icon: "cash",
      title: "Bring Ringgit",
      accent: true,
      lines: [
        "Five meals are own payment (cash, MYR):",
        "Wed lunch (Melaka) · Thu breakfast & lunch (Seremban) · Fri dinner (Port Dickson) · Sun lunch (Yong Peng)"
      ]
    },
    {
      icon: "food",
      title: "Meals by Han",
      lines: [
        "8 meals + 1 snack are included in the package.",
        "A vegan option is served at every Han meal."
      ]
    }
  ],

  days: [
    /* ------------------------------------------------------------ DAY 1 */
    {
      date: "2026-09-09",
      weekday: "Wed",
      dayNum: 9,
      title: "Lunch in Melaka, check-in, BBQ chill night",
      cover: { src: "img/melaka-stadthuys.jpg", alt: "The red Stadthuys building in Melaka", caption: "Melaka: the Stadthuys at Dutch Square",
        credit: { title: "Stadthuys Melaka", author: "Philip Nalangan", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Stadthuys_Melaka.jpg" } },
      handy: ["Passport", "Ringgit for lunch", "Water bottle", "Eat breakfast before the bus", "Be ready at your door from 6:30am"],
      blocks: [
        {
          part: "Morning",
          items: [
            { time: "6:30am", kind: "bus", title: "Bus pick-up from each family's home",
              note: "First stop 6:30am, 2 stops, 4 pax. Please have your own breakfast before boarding." }
          ]
        },
        {
          part: "Afternoon",
          items: [
            { time: "12:00pm", kind: "meal", pay: "own", title: "Lunch in Melaka: Kin by The Daily Fix",
              address: "Jaya, 1, Jln KLJ 9, Taman Kota Laksamana, 75200 Melaka, Malaysia" },
            { time: "2:00pm", kind: "bus", title: "Depart for Port Dickson" },
            { time: "4:00pm", kind: "stay", title: "Drop-off and check-in at AirBnB Ola Mutiara",
              image: { src: "img/port-dickson-teluk-kemang.jpg", alt: "Beach at Teluk Kemang, Port Dickson", caption: "Port Dickson: Teluk Kemang beach",
        credit: { title: "Teluk Kemang Beach, Port Dickson (2)", author: "AyyanD", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Teluk_Kemang_Beach,_Port_Dickson_(2).jpg" } },
              address: "3810, Jalan Siakap 1, Taman Pantai Dickson, 71050 Port Dickson, Negeri Sembilan, Malaysia" }
          ]
        },
        {
          part: "Evening",
          items: [
            { time: "6:00pm", kind: "meal", pay: "han", title: "BBQ dinner by Han",
              note: "Relax and chill at the AirBnB.",
              menuTitle: "BBQ buffet",
              menu: [
                "Seafood BBQ",
                "BBQ chicken with chimichurri and romesco",
                "Roasted corn with compound butter",
                "Salad with lemon pepper dressing",
                "Sautéed French beans with garlic",
                "Cilantro lime rice"
              ],
              vegan: [
                "Grilled portobello mushroom with romesco and chimichurri",
                "Roasted corn, salt and pepper",
                "Salad with lemon pepper dressing",
                "Sautéed French beans",
                "Cilantro lime rice"
              ]
            }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ DAY 2 */
    {
      date: "2026-09-10",
      weekday: "Thu",
      dayNum: 10,
      title: "Seremban market, then nature immersion at Ulu Bendul",
      cover: { src: "img/ulu-bendul.jpg", alt: "Granite boulders and forest stream at Ulu Bendul", caption: "Ulu Bendul Forest Eco-Park",
        credit: { title: "Granite boulders, Ulu Bendul Forest Eco-Park", author: "AyyanD", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Granite_boulders,_Ulu_Bendul_Forest_Eco-Park.jpg" } },
      handy: ["Ringgit for breakfast & lunch", "Walking shoes or sandals", "Water shoes", "Swimwear", "Small towel", "Change of clothes", "Hat", "Insect repellent", "Sunblock", "Water bottle", "Labelled food containers & cutlery"],
      blocks: [
        {
          part: "Morning",
          items: [
            { time: "7:30am", kind: "bus", title: "Bus pick-up at AirBnB Ola Mutiara" },
            { time: "8:30am", kind: "meal", pay: "own", title: "Breakfast at Seremban Market",
              note: "We also shop for fresh seafood and fish for the kids' bushcraft.",
              image: { src: "img/seremban-market.jpg", alt: "Seremban Grand Market building", caption: "Seremban Grand Market",
        credit: { title: "Seremban Grand Market", author: "Chongkian", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Seremban_Grand_Market.jpg" } } },
            { time: "10:00am", kind: "activity", title: "Hike, bushcraft & water play @ Ulu Bendul",
              image: { src: "img/gunung-angsi.jpg", alt: "Gunung Angsi seen across the fields", caption: "Gunung Angsi, the adults' hiking trail",
        credit: { title: "Angsi Mountain 3", author: "AyyanD", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Angsi_Mountain_3.jpg" } },
              steps: [
                { time: "10:00am", text: "Arrival and toilet break" },
                { time: "10:15am", text: "Split into two groups. Adults: hike along the Gunung Angsi trail. Kids: bushcraft." },
                { time: "10:30am", text: "Bushcraft snacks with Han (included): honey butter bread, campfire roasted chicken, foil-wrapped vegetables, and the seafood and fish from the market.", meal: true },
                { time: "11:30am", text: "Water stream play" },
                { time: "12:30pm", text: "Pack up, change, and board the van" },
                { time: "1:00pm", text: "Head to Seremban for lunch" }
              ]
            }
          ]
        },
        {
          part: "Afternoon",
          items: [
            { time: "1:30pm", kind: "meal", pay: "own", title: "Lunch at Restaurant Bo Kee & You, Seremban" },
            { time: "2:30pm", kind: "rest", title: "Jalan jalan around Seremban",
              note: "Buy snacks and drinks." },
            { time: "4:00pm", kind: "bus", title: "Return to the AirBnB" }
          ]
        },
        {
          part: "Evening",
          items: [
            { time: "6:30pm", kind: "meal", pay: "han", title: "Dinner at Han's",
              menuTitle: "Soba night",
              menu: [
                "Soba with dashi broth",
                "Jammy egg and sliced chicken",
                "Leafy vegetables"
              ],
              vegan: [
                "Soba with miso shoyu broth",
                "Tofu, inari and daikon",
                "Leafy vegetables"
              ]
            }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ DAY 3 */
    {
      date: "2026-09-11",
      weekday: "Fri",
      dayNum: 11,
      title: "Cave exploration at Tanjong Tuan, astronomy night at the observatory",
      cover: { src: "img/cape-rachado-lighthouse.jpg", alt: "Cape Rachado Lighthouse at Tanjung Tuan", caption: "Cape Rachado Lighthouse, Tanjung Tuan",
        credit: { title: "Cape Rachado Lighthouse, Malacca, Malaysia, 2024 02", author: "FBilula", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Cape_Rachado_Lighthouse,_Malacca,_Malaysia,_2024_02.jpg" } },
      handy: ["Walking shoes or sandals", "Water shoes", "Swimwear", "Small towel", "Hat", "Sunblock", "Insect repellent", "Water bottle", "Labelled food containers & cutlery", "Ringgit for dinner", "Long sleeves for the night (mosquitoes)"],
      blocks: [
        {
          part: "Morning",
          items: [
            { time: "8:00am", kind: "meal", pay: "han", title: "Breakfast at Han's",
              menuTitle: "Japanese sandos",
              menu: [
                "Tuna melt sandwich",
                "Egg mayo sandwich",
                "Burnt cabbage salad"
              ],
              vegan: [
                "Vegan sandwich",
                "Burnt cabbage salad"
              ]
            },
            { time: "9:00am", kind: "bus", title: "Bus pick-up at Han's" },
            { time: "9:30am", kind: "activity", title: "Cave exploration @ Tanjong Tuan, Melaka",
              image: { src: "img/cape-rachado-beach.jpg", alt: "Rocky beach below Cape Rachado", caption: "The beach and rocky shore below the lighthouse",
        credit: { title: "Cape Rachado Beach", author: "Benjy8769", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Cape_Rachado_Beach.jpg" } },
              steps: [
                { time: "9:30am", text: "Arrival and intro to Tanjong Tuan Recreational Forest" },
                { time: "10:00am", text: "Learn about a coastal forest's flora and fauna while hiking up to Cape Rachado Lighthouse, then down the Pulau Intan trail" },
                { time: "10:45am", text: "Arrive on the beach: rock pool discovery, water and sand play" },
                { time: "11:30am", text: "Hike to the hidden cave along the rocky shore" },
                { time: "12:30pm", text: "Rock climbing and photography" },
                { time: "1:00pm", text: "Hike up to Cape Rachado Lighthouse and down to the main gate" },
                { time: "1:30pm", text: "Board the van and head back for lunch" }
              ]
            }
          ]
        },
        {
          part: "Afternoon",
          items: [
            { time: "1:45pm", kind: "meal", pay: "han", title: "Lunch at Han's",
              menuTitle: "Fried rice with gyoza",
              menu: [
                "Chicken gyoza",
                "Japanese garlic soy fried rice",
                "Stir-fried carrot and broccoli"
              ],
              vegan: [
                "Vegan gyoza",
                "Japanese garlic soy fried rice",
                "Stir-fried carrot and broccoli"
              ]
            },
            { time: "2:30pm", kind: "rest", title: "R&R, enjoy the AirBnB" }
          ]
        },
        {
          part: "Evening",
          items: [
            { time: "6:00pm", kind: "bus", title: "Bus pick-up at AirBnB Ola Mutiara" },
            { time: "6:30pm", kind: "meal", pay: "own", title: "Dinner at Yun Long Seafood Restaurant" },
            { time: "7:45pm", kind: "bus", title: "Head to the Negeri Sembilan Observatory" },
            { time: "8:00pm", kind: "activity", title: "Astronomy night @ Negeri Sembilan Observatory",
              image: { src: "img/milky-way.jpg", alt: "The Milky Way over a dark landscape", caption: "The Milky Way (stock photo, not taken in Malaysia)",
        credit: { title: "Milky Way Panorama (183296559)", author: "Panagiotis Laoudikos", license: "CC BY 3.0", url: "https://commons.wikimedia.org/wiki/File:Milky_Way_Panorama_(183296559).jpeg" } },
              steps: [
                { time: "8:00pm", text: "Arrival and registration" },
                { time: "8:15pm", text: "Walk up to the observatory, led by ushers" },
                { time: "8:30pm", text: "Observation of stars, planets and the Milky Way" },
                { time: "9:15pm", text: "Outdoor observation through powered binoculars; explore the galleries and displays" },
                { time: "10:00pm", text: "Board the van and return to the AirBnB" }
              ]
            }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ DAY 4 */
    {
      date: "2026-09-12",
      weekday: "Sat",
      dayNum: 12,
      title: "Move house, intertidal walk, parent-child sushi making",
      cover: { src: "img/teluk-pelanduk-jetty.jpg", alt: "Fishermen's jetty at Teluk Pelanduk, Port Dickson", caption: "Fishermen's jetty at Teluk Pelanduk",
        credit: { title: "Jeti Nelayan, Teluk Pelanduk, Port Dickson, Malaysia", author: "Ahmad Rithauddin", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Jeti_Nelayan,_Teluk_Pelanduk,_Port_Dickson,_Malaysia_(8243199629).jpg" } },
      handy: ["Bags packed by 11:00am", "Water shoes", "Swimwear", "Small towel", "Hat", "Sunblock", "Water bottle"],
      blocks: [
        {
          part: "Morning",
          items: [
            { time: "8:30am", kind: "meal", pay: "han", title: "Breakfast by Han",
              menuTitle: "Pancakes",
              menu: [
                "Spelt sourdough pancakes",
                "Butter and maple syrup",
                "Fruits"
              ]
            },
            { time: "9:30am", kind: "rest", title: "R&R, enjoy the AirBnB",
              note: "Pack and prepare to move house." },
            { time: "11:00am", kind: "stay", title: "Check out of Ola Mutiara, check in at AirBnB Vista Asana",
              address: "165, Lot 3808 Jalan Siakap 1, Taman Peranginan Mutiara, Taman Pantai Dickson, 71050 Port Dickson, Negeri Sembilan, Malaysia" }
          ]
        },
        {
          part: "Afternoon",
          items: [
            { time: "11:30am", kind: "meal", pay: "han", title: "Lunch at Han's",
              menuTitle: "Burgers",
              menu: [
                "Fried chicken burger",
                "Tapioca fries and salad"
              ],
              vegan: [
                "Vegan burger",
                "Tapioca fries and salad"
              ]
            },
            { time: "12:15pm", kind: "activity", title: "Intertidal walk @ Pantai Teluk Pelanduk",
              steps: [
                { time: "12:15pm", text: "Introductory talk on the intertidal zone, its inhabitants, and how the ebb and rise of the tide shapes this area between land and sea" },
                { time: "1:00pm", text: "Walk to the beach" },
                { time: "1:15pm", text: "Discover what's left on the strandline, explore the exposed seabed, observe marine wildlife up close, and water play for the kids" },
                { time: "3:30pm", text: "End" }
              ]
            }
          ]
        },
        {
          part: "Late afternoon & evening",
          items: [
            { time: "4:00pm", kind: "meal", pay: "han", title: "Parent-child cooking session with Chef Han",
              note: "You make dinner together. Target: done by 6:30–7:00pm.",
              image: { src: "img/sushi-bento.jpg", alt: "A sushi bento box", caption: "Sushi bento (stock photo)",
        credit: { title: "Sushi Bento by Aji Sushi", author: "Andy Li", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Sushi_Bento_by_Aji_Sushi.jpg" } },
              menuTitle: "Sushi bento box",
              menu: [
                "Inari sushi",
                "Kappamaki",
                "Tamagoyaki",
                "Tuna onigiri",
                "Edamame and blanched veggies",
                "Fruits"
              ]
            },
            { time: "6:30pm", kind: "meal", pay: "han", title: "Dinner: the sushi you made" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ DAY 5 */
    {
      date: "2026-09-13",
      weekday: "Sun",
      dayNum: 13,
      title: "Lunch at Yong Peng, home sweet home",
      cover: { src: "img/yong-peng.jpg", alt: "Main street of Yong Peng town", caption: "Yong Peng town, Johor",
        credit: { title: "Yong Peng town", author: "Jack883", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Yong_Peng_town.jpg" } },
      handy: ["Everything packed", "Passport", "Ringgit for lunch", "Water bottle"],
      blocks: [
        {
          part: "Morning",
          items: [
            { time: "8:00am", kind: "meal", pay: "han", title: "Breakfast at Han's",
              menuTitle: "Ramen",
              menu: [
                "Chicken tonkotsu ramen",
                "Chicken gyoza",
                "Stir-fried bok choy"
              ],
              vegan: [
                "Vegan tonkotsu ramen",
                "Vegan gyoza",
                "Stir-fried bok choy"
              ]
            },
            { time: "9:00am", kind: "bus", title: "Check out, bus pick-up at Vista Asana back to Singapore",
              note: "7 pax.",
              address: "165, Lot 3808 Jalan Siakap 1, Taman Peranginan Mutiara, Taman Pantai Dickson, 71050 Port Dickson, Negeri Sembilan, Malaysia" }
          ]
        },
        {
          part: "Afternoon",
          items: [
            { time: "12:30pm", kind: "meal", pay: "own", title: "Lunch stop at Yong Peng: 新村瓮窑鸡 Xing Cun Restaurant",
              address: "7322, Jln Besar, Taman Sembrong Baru, 83700 Yong Peng, Johor Darul Ta'zim, Malaysia" },
            { time: "4:00pm", kind: "bus", title: "ETA Singapore, drop-off at each family's home" }
          ]
        }
      ]
    }
  ],

  /* Meals at a glance. pay: "han" | "own" | "none" */
  mealsGlance: [
    { day: "Wed 9",  breakfast: { pay: "none", text: "Own, before the bus" }, lunch: { pay: "own", text: "Kin by The Daily Fix, Melaka" }, dinner: { pay: "han", text: "BBQ" } },
    { day: "Thu 10", breakfast: { pay: "own", text: "Seremban Market" }, lunch: { pay: "own", text: "Bo Kee & You, Seremban", extra: "+ bushcraft snacks by Han" }, dinner: { pay: "han", text: "Soba" } },
    { day: "Fri 11", breakfast: { pay: "han", text: "Japanese sandos" }, lunch: { pay: "han", text: "Fried rice with gyoza" }, dinner: { pay: "own", text: "Yun Long Seafood" } },
    { day: "Sat 12", breakfast: { pay: "han", text: "Pancakes" }, lunch: { pay: "han", text: "Burgers" }, dinner: { pay: "han", text: "Sushi you make" } },
    { day: "Sun 13", breakfast: { pay: "han", text: "Ramen" }, lunch: { pay: "own", text: "Xing Cun, Yong Peng" }, dinner: { pay: "none", text: "Home" } }
  ],

  /* Packing list. Ticks are saved on each person's own phone. */
  packing: [
    {
      group: "Must bring",
      items: [
        { id: "containers", text: "Food containers, labelled with your names", note: "Please make sure you bring these. We are packing food!", must: true },
        { id: "cutlery", text: "Cutlery" },
        { id: "ringgit", text: "Ringgit (cash) for the five own-payment meals" },
        { id: "passport", text: "Passport" },
        { id: "bottle", text: "Water bottles" }
      ]
    },
    {
      group: "Clothes",
      items: [
        { id: "longsleeve", text: "Easy-to-dry long-sleeve tops" },
        { id: "shortsleeve", text: "Light short-sleeve shirts", note: "If you don't mind the mosquitoes." },
        { id: "pants", text: "Long pants or shorts for the hike" },
        { id: "swimwear", text: "Swimwear, 2 sets", note: "We get wet pretty often." },
        { id: "hat", text: "Hat" },
        { id: "hangers", text: "Clothes hangers", note: "If you want to wash clothes." }
      ]
    },
    {
      group: "Water, sun & bugs",
      items: [
        { id: "goggles", text: "Swim goggles" },
        { id: "towel", text: "Small towel to bring out each day" },
        { id: "repellent", text: "Insect repellent" },
        { id: "sunblock", text: "Sunblock" }
      ]
    },
    {
      group: "Footwear",
      items: [
        { id: "watershoes", text: "Water shoes" },
        { id: "walkshoes", text: "Comfortable walking shoes or sandals for the hike", note: "Easy to dry if they get wet." }
      ]
    }
  ]
};
