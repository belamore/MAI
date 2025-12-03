let gameState = 0;

let bgImages = [];
let story = [];
let currentPanel = 0;

let startButton;
let nextButton;

let maiSprite;
let niraSprite;

// Typewriter
let displayedText = "";
let typingIndex = 0;
let typingSpeed = 1.5;

function preload() {
  bgImages[0] = loadImage("cave.png");
  bgImages[1] = loadImage("cave2.png");
  bgImages[2] = loadImage("city.png");
  bgImages[3] = loadImage("market.png");
  bgImages[4] = loadImage("maimarket.png");
  bgImages[5] = loadImage("nirarun.png");
  bgImages[6] = loadImage("maihelp.png");
  bgImages[7] = loadImage("interaction.png");
  bgImages[8] = loadImage("maiscarf.png");
  bgImages[9] = loadImage("sunset.png");
  bgImages[10] = loadImage("marketnight.png");
  bgImages[11] = loadImage("room.jpg");
  bgImages[12] = loadImage("sunrise.jpg");
  bgImages[13] = loadImage("titlescreen.png");
  bgImages[14] = loadImage("mountains.jpg");
  bgImages[15] = loadImage("lab.png");
  bgImages[16] = loadImage("desk.png");
  bgImages[17] = loadImage("maisword.png");




  maiSprite = loadImage("maisprite.png");
  niraSprite = loadImage("nirasprite.png");
}

function setup() {
  createCanvas(1920, 1080);

  startButton = createButton('Start Game');
  startButton.addClass('start-btn');
  startButton.position(width / 2 + 600, height / 2 + 100);
  startButton.mousePressed(() => {
    gameState = 1;
    currentPanel = 0;
    typingIndex = 0;
    displayedText = "";
  });

  nextButton = createButton('Next');
  nextButton.addClass('next-btn');
  nextButton.position(width - 200, height - 100);
  nextButton.mousePressed(nextPanel);
  nextButton.hide();

  setupStory();
}

function draw() {
  background(0);

  if (gameState === 0) drawTitleScreen();
  else drawStory();
}

function drawTitleScreen() {
  image(bgImages[13], 0, 0, width, height);

  textAlign(CENTER, CENTER);
  fill(0);
  textSize(50);
  text("Menu", width / 2 + 600, height / 2 - 50);

  startButton.show();
  nextButton.hide();
}

function drawStory() {
  startButton.hide();
  nextButton.show();

  let panel = story[currentPanel];

  // Draw background
  image(bgImages[panel.bg], 0, 0, width, height);

  // Draw sprites
  if (panel.sprites) {
    for (let s of panel.sprites) {
      if (s === "mai") {
        image(maiSprite, 250, 50);
      } else if (s === "nira") {
        image(niraSprite, 0, 50);
      }
    }
  }

  // Dialogue box
  fill(0, 0, 0, 150);
  rect(80, height - 300, width - 200, 250, 15);

  fill(255);
  noStroke();
  textSize(23);
  textAlign(CENTER, CENTER);

  let fullText = panel.text;

  // Typewriter effect
  if (typingIndex < fullText.length) {
    if (frameCount % typingSpeed === 0) {
      typingIndex++;
      displayedText = fullText.substring(0, typingIndex);
    }
  }

  let dialogX = 120;
  let dialogY = height - 270;
  let dialogW = width - 280;
  let dialogH = 220;

  textAlign(CENTER, TOP);
  text(displayedText, dialogX, dialogY, dialogW, dialogH);


  // name box
  let characterName = panel.name || "";

  if (characterName !== "") {
    let nameBoxX = 100;
    let nameBoxY = height - 360;
    let nameBoxW = 250;
    let nameBoxH = 50;

    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(nameBoxX, nameBoxY, nameBoxW, nameBoxH, 10);

    noStroke();
    fill(0);
    textSize(28);
    textAlign(LEFT, CENTER);
    text(characterName, nameBoxX + 20, nameBoxY + nameBoxH / 2);
  }
}

function setupStory() {
  story = [
    // cave intro
    { bg: 0, text: "…It's fairly quiet in the ruins.. Only the sound of a nearby water fall and drips of water echoes through the ruins.", sprites: [] },
    { bg: 0, text: "At the center of the ruins rests something strange. An abandoned pod that seems to have contained something.", sprites: [] },
    { bg: 0, text: "A soft hum begins to pulse from within it.", sprites: [] },

    // mai awakes
    { bg: 0, text: "The glass of the pod is shattered within nothing to be seen lying within it. and the has been shattered.", sprites: [] },

    { bg: 1, text: "A robotic figure steps out of the cave slowly, unsteady, as if taking her first breaths.", sprites: [] },

    { bg: 1, name: "???", text: "\"...Where... am I?\"", sprites: [] },

    { bg: 1, text: "She reaches instinctively for the scarf around her neck; familiar, warm… yet she does not know why.", sprites: [] },

    { bg: 1, text: "Stepping outside, she is met with a vast, unfamiliar world glowing beneath the evening sun.", sprites: [] },

    { bg: 1, text: "", sprites: [] },

    { bg: 1, text: "She is only guided by instict; instict that tells her to embark on a journey and discover the answers she's looking for.", sprites: [] },
    //joruny begins
    { bg: 9, name: "", text: "It's been a long few days of searching. But what exactly is she searching for?", sprites: [] },

    { bg: 9, name: "", text: "She finds herself in need of recharging after a long few days of venturing, so she takes some time to wind down and reflect.", sprites: ["mai"] },


    { bg: 9, name: "", text: "Mai is searching into her bag, and she finds a currency that her data set immediately recognizes. ", sprites: ["mai"] },

    { bg: 9, name: "???", text: "\"There must be civiliation around here, but I can't detect the exact location.\"", sprites: ["mai"] },

    { bg: 9, name: "", text: "Unfortuantely, other parts of her systems appear to be malfunctioning. ", sprites: ["mai"] },

    { bg: 9, name: "", text: "She pulls a coin out of her bag and fidgets with it as she ponders.", sprites: ["mai"] },

    { bg: 9, name: "Mai", text: "\"I'm .. Mai. but I can't remember.. who I am.. what I’m meant to do or who created me.\"", sprites: ["mai"] },
    { bg: 9, name: "Mai", text: "\"But something out there is calling to me.\"", sprites: ["mai"] },

    { bg: 9, name: "", text: "That night, after some reflection, she rests; still unsure of her purpose.", sprites: [] },

    { bg: 12, text: "It's early and the morning, and Mai rises from her sleep to continue on her journey.", sprites: ["mai"] },

    //civilization

    { bg: 2, text: "After 6 whole days of venturing, Mai finally finds civilization.", sprites: [] },


    { bg: 2, text: "Mai proceeds into the city, in hopes of finding clues that will help her find her purpose.", sprites: [] },

    //market
    { bg: 3, text: "Upon entering, Mai stumbles upon a market. The market buzzes with life, a society with humans and robots alike", sprites: [] },
    { bg: 3, text: "Mai finds herself wandering through the marketplace, taking in the unfamiliar world.", sprites: ["mai"] },
    { bg: 3, name: "Mai", text: "\"Theres something here that's drawing me to this market..\"", sprites: ["mai"] },

    { bg: 4, name: "Mai", text: "Mai stops a perticular stall while raising her arm to her chin, observing the items at the stall.", sprites: [] },

    { bg: 4, name: "Mai", text: "The vendor is selling a variety of items, inluding ", sprites: [] },

    //nira appearance
    { bg: 5, text: "Suddenly, in the distance, something catches her attention.", sprites: [] },
    { bg: 5, text: "A young girl darts into the market as she appears to be running away from secuirty drones.", sprites: [] },

    { bg: 5, text: "The girl quickly rushes under a table before the security drones can see and successfully hides from them in time.", sprites: [] },

    //help option??
    { bg: 3, text: "Mai is startled, before she starts deciding if she wants to give a girl a hand or not.", sprites: [] },

    { bg: 3, text: "Once the security drones are out of sight, mai decides to give the girl a hand.", sprites: [] },

    { bg: 6, text: "The girl hesitates, but curiously ends up taking mai's hand.", sprites: [] },

    //first interaction
    { bg: 7, name: "", text: "Upon eye contact, an immediate silence falls between them for a few seconds.", sprites: [] },

    { bg: 7, name: "", text: "There's an awkward tension brewing between them before the child breaks the silence.", sprites: [] },

    { bg: 3, name: "???", text: "“That symbol… on your shirt!! I’ve seen it before!”", sprites: ["nira", "mai"] },

    { bg: 3, text: "Mai looks down at her shirt, unsure of what it's supposed to mean, but she wanted to know more.", sprites: ["nira", "mai"] },

    { bg: 3, name: "Nira", text: "\"Do you know anything about my mom?!\”", sprites: ["nira", "mai"] },

    { bg: 3, name: "Mai", text: "\"Your mother…? Do we know each other?\"", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "\“I don’t know..You don't look familiar. But that symbol… it means something.\”", sprites: ["nira", "mai"] },

    {
      bg: 3, name: "Nira", text: "\“Meet me here tomorrow once the bells ring in the afternoon, okay? I need to show you something.\”", sprites: ["nira", "mai"]
    },

    { bg: 3, name: "Nira", text: "\“Oh! and my name is Nira okay byee!\”", sprites: ["nira", "mai"] },

    { bg: 3, text: "Before Mai can ask anything else, the girl slips back into the crowd.", sprites: [] },

    // Interaction ends
    { bg: 3, text: "No matter what happened, Mai continues deeper into the market, her mind heavy with questions.", sprites: ["mai"] },

    { bg: 3, text: "Yet she cannot shake the strange pull she feels toward the girl.", sprites: ["mai"] },

    { bg: 3, text: "After the strange encounter, Mai explores the market further, hoping for answers.", sprites: ["mai"] },

    // night
    { bg: 10, text: "As night falls, Mai realizes the reason she felt drawn to the market… was Nira.", sprites: [] },

    { bg: 10, text: "There was something familair about that girl.", sprites: [] },

    { bg: 10, text: "With her energy running low, Mai decides to look for an inn nearby.", sprites: [] },

    // Inn
    { bg: 11, text: "The room is dimly lit by hanging lamps, their glow soft and calming.", sprites: [] },
    { bg: 11, text: "Finally alone, Mai reflects on the day; on Nira.", sprites: [] },
    { bg: 11, text: "As she moves toward the mirror, she notices a tear in her scarf… something glints inside.", sprites: [] },

    { bg: 11, text: "Curious, she removes the scarf and inspects it more closely.", sprites: [] },

    { bg: 8, text: "Under the warm lamp light, an intricate map reveals itself etched secretly into the scarf.", sprites: [] },

    { bg: 8, text: "After the events that occured that day, Mai couldn't help but wonder if this could be related to Nira.", sprites: [] },

    { bg: 8, text: "This map could be the next clue to finding out her purpose.", sprites: [] },

    // next day

    { bg: 3, text: "Mai returns to the market in the afternoon, just as Nira asked. The crowd is thinner today, and the air feels colder.", sprites: ["mai"] },

    { bg: 3, text: "Nira approaches carefully, clutching something in both hands and leads her to an alleyway within the market. She looks relieved to see Mai again.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "\"You came… I wasn’t sure you would.\"", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "\"You said you had something to show me.\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "Nira unfolds the handkerchief. The same symbol on Mai’s shirt is stitched into one corner.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "\"My mom made this for me before she.. left on an expedition. At least that's what *they* tell me anyway, but she told me if I ever met someone with this symbol, to trust them.\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "Mai stares at the matching designs, a strange comfort blooming inside her chest.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "\"Your mother, who was she?\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "Nira looks up, eyes shining with fragile hope.", sprites: ["mai", "nira"] },


    { bg: 3, name: "Nira", text: "\"People call her Dr.Solis, she's a scientist.\"", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "Mai thinks for a moment.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "A scientist..Do you think she may have created me?", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "\"I wouldn't know much about that... she works for the government so she's not allowed to tell me what she's up to when she's away, and they told me not to ask.. even to this day.\"", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "\"But now she's been away for over a year, and she hasn't responded to my letters. Do you think… she’s somewhere out there?\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "Mai hesitates. She has no memories, but something deep inside her responds to Nira’s question.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "\"I don’t know... but, I think the map on my scarf may lead to more clues about your mother.\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "Nira’s breath catches.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "\"A map? Your scarf has a map?\"", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "\"Yes. I discovered it last night, this location must be very important.\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "Nira clutches her handkerchief closer.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "\"Then we have to go. I want to find her.. and I can help! I know my way around the city\"", sprites: ["mai", "nira"] },

    //mai opposes/mai agrees
    { bg: 3, text: "Mai feels a subtle pulse, almost like a memory flickering at the edge of her mind.", sprites: ["mai", "nira"] },

    { bg: 3, text: "Mai nods with a sublte smile on her face.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "\"Then we’ll go together.\"", sprites: ["mai", "nira"] },

    // journey begins
    { bg: 3, text: "Mai and Nira leave the safety of the market behind, following the markings from the scarf's map.", sprites: ["mai", "nira"] },

    { bg: 3, text: "Their path leads them through old streets and abandoned outskirts where the city gives way to wilderness.", sprites: [] },

    { bg: 3, name: "Nira", text: "\"Mom used to tell me stories about this part of the planet. She said it was dangerous.\"", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "\"If it's located around here… she must have had a reason.\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "They continue down a winding trail, the air growing colder as the forest thickens.", sprites: [] },

    { bg: 3, text: "Strange machines lie half buried beneath the foliage, long deactivated.", sprites: [] },

    { bg: 3, name: "Nira", text: "\"… I remember their shapes from her notes. I snooped through them occasionaly but have no idea what they meant.\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "As they walk, the symbol on Mai’s shirt begins to glow faintly, reacting to an unseen signal.", sprites: ["mai", "nira"] },

    { bg: 3, name: "Nira", text: "\"Mai… your symbol is glowing.\"", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "\"It’s guiding us.\"", sprites: ["mai", "nira"] },

    // lab opening
    { bg: 3, text: "The forest opens into a clearing that appears unnatural and manmade.", sprites: [] },

    { bg: 3, text: "In the center stands a structure covered in vines and metal plating. A hidden facility.", sprites: [] },

    { bg: 3, name: "Nira", text: "\"Is this it..?\"", sprites: ["nira"] },

    { bg: 3, name: "Mai", text: "\"Your mother was here. I can feel it.\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "A faint hum echoes from beneath the ground, old machinery awakening at their presence.", sprites: [] },

    { bg: 3, text: "The entrance door glows faintly as Mai steps near, reacting to the symbol on her shirt.", sprites: [] },

    { bg: 3, text: "With a soft hiss, the door unlocks.", sprites: [] },

    { bg: 3, name: "Nira", text: "\"Mai… I’m scared.\"", sprites: ["nira"] },

    { bg: 3, text: "Mai lends out her hand to Nira.", sprites: [] },

    { bg: 3, name: "Mai", text: "\"Stay close, okay? Whatever is inside, your mother left it for us.\"", sprites: ["mai", "nira"] },

    { bg: 3, text: "Together, they step into the darkness of the hidden lab.", sprites: ["mai", "nira"] },

    { bg: 15, text: "The door seals shut behind them, locking them in from the world outside.", sprites: ["mai", "nira"] },

    { bg: 15, text: "Red emergency lights flicker weakly along the ceiling, barely illuminating the metal corridor.", sprites: [] },

    { bg: 15, name: "Nira", text: "\"Why is it so dark, Shouldn't a place like this have power?\"", sprites: ["mai", "nira"] },

    { bg: 15, name: "Mai", text: "\"It seems to be running on backup generators only. Very low energy.\"", sprites: ["mai", "nira"] },

    { bg: 15, text: "As they move deeper into the corridor, a scanner hidden in the wall activates with a sharp noise.", sprites: [] },

    { bg: 15, text: "A beam of blue light sweeps across Mai’s face.", sprites: [] },

    { bg: 15, name: "System", text: "\"Identity confirmed. Model: MAI-07. Access level: Primary.\"", sprites: [] },

    { bg: 15, name: "Nira", text: "\"Mai… it recognized you. You were part of this place.\"", sprites: ["mai", "nira"] },

    { bg: 15, name: "Mai", text: "I suppose I was..", sprites: ["mai", "nira"] },


    { bg: 15, text: "As they proceed, an eerie green glow spills into the hallway from a cracked door ahead.", sprites: [] },

    { bg: 15, text: "Inside the room stands a large cylindrical tube filled with thick, glowing luminescent green fluid", sprites: [] },

    { bg: 15, name: "Nira", text: "\"What is that?\"", sprites: ["mai", "nira"] },

    { bg: 15, name: "Mai", text: "\"A bio pod. It can sustain organic or synthetic life, though I don’t know why it’s still active.\"", sprites: ["mai", "nira"] },

    { bg: 15, text: "The light from the fluid casts long shadows across the lab. ", sprites: [] },

    // The desk
    { bg: 16, text: "In a corner of the room sits a desk covered in........", sprites: [] },

    // { bg: 15, text: "Mai and Nira approach the desk carefully, brushing dust off.", sprites: ["mai"] },

    // { bg: 15, name: "Nira", text: "\"This was my mom’s handwriting, I recognize it!\"", sprites: ["nira"] },

    // { bg: 15, name: "Mai", text: "\"Let’s examine this. It might tell us what happened here.\"", sprites: ["mai"] },

    // { bg: 15, text: "The Lab is still surprsingly neat...Among the clutter lies a journal with several pages torn out, the remaining ones filled with urgent notes.", sprites: [] },

    // { bg: 15, text: "A small drive on the desk..", sprites: [] },

    // { bg: 15, name: "Mai", text: "\"This log still works. I’ll try accessing it.\"", sprites: ["mai"] },

  ];
}

function nextPanel() {
  currentPanel++;
  if (currentPanel >= story.length) currentPanel = story.length - 1;

  typingIndex = 0;
  displayedText = "";
}
