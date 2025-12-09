let gameState = 0;

let bgImages = [];
let story = [];
let currentPanel = 0;

let clickSound;

let choiceTimer = 0;
let maxChoiceTime = 180;
let timerActive = false;

let talkBounce = 0;
let talkBounceSpeed = 0;


let startButton;
let nextButton;

let maiSprite;
let niraSprite;

// Typewriter
let displayedText = "";
let fullText = "";
let typingIndex = 0;
let typingSpeed = 2;

let customFont;

// Desk objects
let clipboardImg, polaroidImg, monitorImg, flashdriveImg, lettersImg;

let deskObjects = [
  { name: "clipboard", img: null, x: 100, y: 750 },
  { name: "polaroid", img: null, x: 30, y: 50 },
  { name: "monitor", img: null, x: 670, y: 5 },
  { name: "flashdrive", img: null, x: 1450, y: 700 },
  { name: "letters", img: null, x: 320, y: 40 }
];

function preload() {
  clickSound = loadSound('click.mp3');
  customFont = loadFont("Tektur-VariableFont_wdth,wght.ttf");
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
  bgImages[18] = loadImage("forest.jpg");
  bgImages[19] = loadImage("forest2.jpg");
  bgImages[20] = loadImage("outskirts.jpg");
  bgImages[21] = loadImage("hall.png");
  bgImages[22] = loadImage("desk.png");
  bgImages[23] = loadImage("maiprotect.png");

  maiSprite = loadImage("maisprite.png");
  niraSprite = loadImage("nirasprite.png");

  clipboardImg = loadImage("clipboard.png");
  polaroidImg = loadImage("polaroid.png");
  monitorImg = loadImage("monitor.png");
  flashdriveImg = loadImage("flashdrive.png");
  lettersImg = loadImage("letters.png");
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
    fullText = "";
  });

  nextButton = createButton('Next');
  nextButton.addClass('next-btn');
  nextButton.position(width - 200, height - 100);
  nextButton.mousePressed(nextPanel);
  nextButton.hide();

  deskObjects[0].img = clipboardImg;
  deskObjects[1].img = polaroidImg;
  deskObjects[2].img = monitorImg;
  deskObjects[3].img = flashdriveImg;
  deskObjects[4].img = lettersImg;

  setupStory();
}

function draw() {
  background(0);

  if (gameState === 0) drawTitleScreen();
  else if (gameState === 1) drawStory();
  else if (gameState === 2) drawEndScreen();
}

function drawTitleScreen() {
  image(bgImages[13], 0, 0, width, height);

  textAlign(CENTER, CENTER);
  fill(0);
  textSize(50);
  text("Menu", width / 2 + 620, height / 2 - 10);

  textFont(customFont);

  startButton.show();
  nextButton.hide();
}

function drawEndScreen() {
  image(bgImages[13], 0, 0, width, height);

  textAlign(CENTER, CENTER);
  textFont(customFont);
  fill(0);
  textSize(50);
  text("Thanks for Playing", width / 2 + 620, height / 2 - 10);

  // Hide both buttons
  startButton.hide();
  nextButton.hide();
}


function drawStory() {
  startButton.hide();

  // final panel
  if (story[currentPanel].type === "end") {
    gameState = 2;
    return;
  }

  // bounce anim
  if (talkBounce < 0) {
    talkBounce += talkBounceSpeed;
  }


  let panel = story[currentPanel];
  image(bgImages[panel.bg], 0, 0, width, height);


  if (panel.sprites) {

    // Show Mai if listed
    if (panel.sprites.includes("mai")) {
      let bounce = panel.name === "Mai" ? talkBounce : 0;
      image(maiSprite, 250, 50 + bounce);
    }

    // Show Nira if listed
    if (panel.sprites.includes("nira")) {
      let bounce = panel.name === "Nira" ? talkBounce : 0;
      image(niraSprite, 0, 50 + bounce);
    }
  }


  // Desk interaction
  if (panel.bg === 16) drawDeskObjects();

  // Dialogue box
  fill(0, 0, 0, 150);
  rect(80, height - 300, width - 200, 250, 15);

  fill(255);
  noStroke();
  textSize(23);
  textAlign(CENTER, TOP);

  // Reset typewriter text when panel changes
  if (fullText !== panel.text && fullText === "") {
    fullText = panel.text;
    typingIndex = 0;
    displayedText = "";
  }

  // Typewriter
  if (typingIndex < fullText.length) {
    if (frameCount % typingSpeed === 0) {
      typingIndex++;
      displayedText = fullText.substring(0, typingIndex);
    }
  }

  text(displayedText, 120, height - 270, width - 280, 220);

  // Character name box
  if (panel.name) {
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(100, height - 360, 250, 50, 10);
    noStroke();
    fill(0);
    textSize(28);
    textAlign(LEFT, CENTER);
    text(panel.name, 120, height - 335);
  }


  if (panel.type === "choice") {
    nextButton.hide();

    // activate timer if time panel
    if (panel.timed) {
      if (!timerActive) {
        timerActive = true;
        choiceTimer = 0;
      }

      if (timerActive) {
        choiceTimer++;

        if (choiceTimer >= maxChoiceTime) {
          timerActive = false;
          choiceTimer = 0;

          currentPanel = panel.options[0].nextPanel;
          fullText = "";
          displayedText = "";
          typingIndex = 0;
          return;
        }
      }

      // Draw timer bar
      let barWidth = map(choiceTimer, 0, maxChoiceTime, 400, 0);
      fill(255);
      rect(width / 2 - 200, height - 80, barWidth, 20, 5);
    } else {

      timerActive = false;
      choiceTimer = 0;
    }


    // Draw Choice Buttons
    fill(50, 50, 50, 200);
    for (let i = 0; i < panel.options.length; i++) {
      let y = height - 200 + i * 60;

      fill(200);
      rect(width / 2 - 180, y, 360, 50, 10);

      fill(0);
      textAlign(CENTER, CENTER);
      textSize(24);
      text(panel.options[i].text, width / 2, y + 25);
    }

    return;
  }


  nextButton.show();
}

function drawDeskObjects() {
  for (let obj of deskObjects) {
    image(obj.img, obj.x, obj.y);

    let isHover =
      mouseX > obj.x && mouseX < obj.x + obj.img.width &&
      mouseY > obj.y && mouseY < obj.y + obj.img.height;

    if (isHover) {
      noFill();
      stroke(255);
      strokeWeight(4);
      rect(obj.x, obj.y, obj.img.width, obj.img.height);
    }
  }

  noStroke();
  noTint();
}

function mousePressed() {
  let panel = story[currentPanel];

  clickSound.play();

  // Handle desk objects
  if (panel.bg === 16) {
    for (let obj of deskObjects) {
      if (
        mouseX > obj.x && mouseX < obj.x + obj.img.width &&
        mouseY > obj.y && mouseY < obj.y + obj.img.height
      ) {
        inspectObject(obj.name);
        return;
      }
    }
  }

  // choice clicks
  if (panel.type === "choice") {
    for (let i = 0; i < panel.options.length; i++) {
      let y = height - 200 + i * 60;
      if (
        mouseX > width / 2 - 180 &&
        mouseX < width / 2 + 180 &&
        mouseY > y &&
        mouseY < y + 50
      ) {
        currentPanel = panel.options[i].nextPanel;
        fullText = "";
        displayedText = "";
        typingIndex = 0;
        return;
      }
    }
  }
}

function inspectObject(name) {
  typingIndex = 0;
  displayedText = "";

  switch (name) {
    case "clipboard":
      fullText = "A clipboard full of scientific notes; Dr. Solis’s handwriting is recognized by Nira. The first page is a sketch of what appears to be MAI, a drawing that seems to have been made by a young child. Nira looks at the drawing with a sense of familiarity. ";
      break;
    case "polaroid":
      fullText = "A dusty polaroid photo of Nira with someone whose face is scratched out.";
      break;
    case "monitor":
      fullText = "A cracked monitor. A corrupted login screen flickers weakly.";
      break;
    case "flashdrive":
      fullText = "A flash drive with the same symbol as Mai's chest. Its data is encrypted.";
      break;
    case "letters":
      fullText = "A bundle of letters addressed from Nira. Some are still unopened.";
      break;
  }

  typingIndex = 0;
  displayedText = "";
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
    { bg: 3, name: "Mai", text: "\"Theres something here that's drawing me to this market..\"", sprites: [] },

    { bg: 4, name: "Mai", text: "Mai stops a perticular stall while raising her arm to her chin, observing the items at the stall.", sprites: [] },

    { bg: 4, name: "Mai", text: "The vendor is selling a variety of items, inluding ", sprites: [] },

    //nira appearance
    { bg: 5, text: "Suddenly, in the distance, something catches her attention.", sprites: [] },
    { bg: 5, text: "A young girl darts into the market as she appears to be running away from secuirty drones.", sprites: [] },

    { bg: 5, text: "The girl quickly rushes under a table before the security drones can see and successfully hides from them in time.", sprites: [] },

    //help option??
    { bg: 3, text: "Mai is startled, before she starts deciding if she wants to give a girl a hand or not.", sprites: [] },

    {
      bg: 3,
      type: "choice",
      text: "Mai sees the girl hiding from security drones. What should she do?",
      options: [
        { text: "Help the girl", nextPanel: 33 }, // temporary panel
        { text: "Ignore her", nextPanel: 35 }     // temporary panel
      ]
    },

    //helping
    {
      bg: 3,
      text: "Once the security drones are out of sight, Mai decides to help the girl.",
      sprites: [],
      returnTo: 35 // panel after choice branch ends
    },

    //  ignoring
    {
      bg: 3,
      text: "Mai ignores the girl, and shortly after the drones leave the girl comes out from under the table.",
      sprites: [],
      returnTo: 37
    },

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

    {
      bg: 3,
      type: "choice",
      text: "Mai decides if she should tell her about the scarf.",
      options: [
        { text: "Tell her about the scarf", nextPanel: 77 },
        { text: "Don't tell her about the scarf", nextPanel: 74 }
      ]
    },

    //Branch a
    { bg: 3, name: "Mai", text: "Mai stays silent, as she's unsure if she wants to involve the child. ", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "However, Nira notices the tear in her scarf anyway, which emanates a certain glow. ", sprites: ["mai", "nira"] },

    { bg: 3, name: "Mai", text: "Hey whats that?", sprites: ["mai", "nira"] },

    //merge
    { bg: 3, name: "Mai", text: "\"I think the map on my scarf may lead to more clues about your mother.\"", sprites: ["mai", "nira"] },

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
    { bg: 20, text: "Mai and Nira leave the safety of the market behind, following the markings from the scarf's map.", sprites: ["mai", "nira"] },

    { bg: 20, text: "Their path leads them through old streets and abandoned outskirts where the city gives way to wilderness.", sprites: [] },

    { bg: 20, name: "Nira", text: "\"Mom used to tell me stories about this part of the planet. She said it was dangerous.\"", sprites: ["mai", "nira"] },

    { bg: 20, name: "Mai", text: "\"If it's located around here… she must have had a reason.\"", sprites: ["mai", "nira"] },

    { bg: 18, text: "They continue down a winding trail, the air growing colder as the trails leads them to a forest thickens.", sprites: [] },

    { bg: 18, text: "Strange machines lie half buried beneath the foliage, long deactivated.", sprites: [] },

    { bg: 18, name: "Nira", text: "\"… I remember their shapes from her notes. I snooped through them occasionaly but have no idea what they meant.\"", sprites: ["mai", "nira"] },

    { bg: 18, text: "As they walk, the symbol on Mai’s shirt begins to glow faintly, reacting to an unseen signal.", sprites: ["mai", "nira"] },

    { bg: 18, name: "Nira", text: "\"Mai… your symbol is glowing.\"", sprites: ["mai", "nira"] },

    { bg: 18, name: "Mai", text: "\"It’s guiding us.\"", sprites: ["mai", "nira"] },

    // lab opening
    { bg: 19, text: "The forest opens into a clearing that appears unnatural and manmade.", sprites: [] },

    { bg: 19, text: "In the center stands a structure covered in vines and metal plating. A hidden facility.", sprites: [] },

    { bg: 19, name: "Nira", text: "\"Is this it..?\"", sprites: ["nira"] },

    { bg: 19, name: "Mai", text: "\"Your mother was here. I can feel it.\"", sprites: ["mai", "nira"] },

    { bg: 19, text: "A faint hum echoes from beneath the ground, old machinery awakening at their presence.", sprites: [] },

    { bg: 19, text: "The metal plate floor glows faintly as Mai steps near, reacting to the symbol on her shirt.", sprites: [] },

    //metal plate choice
    {
      bg: 19,
      type: "choice",
      timed: true,
      text: "The metal plate hums softly beneath Mai’s feet.\nWhat should she do?",
      options: [
        { text: "Step onto the metal plate", nextPanel: 103 },
        { text: "Wait and observe", nextPanel: 105 }
      ]
    },

    // branch a 
    {
      bg: 19,
      text: "Mai steps confidently onto the plate. Immediately, the machinery awakens...",
      sprites: ["mai"]
    },
    {
      bg: 19,
      text: "A low vibration rolls through the ground. Nira jumps back, startled.",
      sprites: ["nira", "mai"],
      returnTo: 108
    },

    // branch b
    {
      bg: 19,
      text: "Mai holds back, stepping away from the plate. It continues to glow faintly.",
      sprites: ["mai"]
    },
    {
      bg: 19,
      text: "Nira fidgets nervously. \"Mai… is something supposed to happen?\"",
      sprites: ["nira", "mai"],
      returnTo: 103
    },

    //merge
    {
      bg: 19,
      text: "Suddenly, the plate activates on its own. A sharp hiss echoes as ancient mechanisms awaken. The sealed door unlocks.",
      sprites: []
    },


    { bg: 19, text: "With a soft hiss, the door unlocks.", sprites: [] },

    { bg: 19, name: "Nira", text: "\"Mai… I’m scared.\"", sprites: ["nira"] },

    { bg: 19, text: "Mai lends out her hand to Nira.", sprites: [] },

    { bg: 19, name: "Mai", text: "\"Stay close, okay? Whatever is inside, your mother left it for us.\"", sprites: ["mai", "nira"] },

    { bg: 19, text: "Together, they step down into the darkness of the location.", sprites: ["mai", "nira"] },

    { bg: 19, text: "The metal plate seals shut above them as they descend, locking them in from the world outside.", sprites: ["mai", "nira"] },

    { bg: 21, text: "lights flicker weakly along the walls, barely illuminating the area.", sprites: [] },

    { bg: 21, name: "Nira", text: "\"Why is it so dark, Shouldn't a place like this have power?\"", sprites: ["mai", "nira"] },

    { bg: 21, name: "Mai", text: "\"It seems to be running on backup generators only. Very low energy.\"", sprites: ["mai", "nira"] },

    { bg: 21, text: "As they move deeper into the corridor, a scanner hidden in the wall activates with a sharp noise.", sprites: [] },

    { bg: 21, text: "A beam of blue light sweeps across Mai’s face.", sprites: [] },

    { bg: 21, name: "System", text: "\"Identity confirmed. Model: MAI-07. Access level: Primary.\"", sprites: [] },

    { bg: 21, name: "Nira", text: "\"Mai… it recognized you. You were part of this place.\"", sprites: ["mai", "nira"] },

    { bg: 21, name: "Mai", text: "I suppose I was..", sprites: ["mai", "nira"] },


    { bg: 15, text: "As they proceed, an eerie green glow spills into the hallway from a cracked door ahead.", sprites: [] },

    { bg: 15, text: "Inside the room stands a large cylindrical tube filled with thick, glowing luminescent green fluid", sprites: [] },

    { bg: 15, name: "Nira", text: "\"What is that?\"", sprites: ["mai", "nira"] },

    { bg: 15, name: "Mai", text: "\"A bio pod. It can sustain organic or synthetic life, though I don’t know why it’s still active.\"", sprites: ["mai", "nira"] },

    { bg: 15, text: "The light from the fluid casts long shadows across the lab. ", sprites: [] },

    // The desk
    { bg: 16, text: "Hover over items to see what you can interact with.", sprites: [] },

    { bg: 22, text: "After inserting the drive, a holographic video of Dr.Solis plays.", sprites: [] },

    { bg: 22, name: "", text: "As Mai steps away from the desk, the cracked monitor flickers violently... then steadies." },

    { bg: 22, name: "System", text: "\"User detected. Identity match: MAI-07.\"" },

    { bg: 22, name: "Dr.Solis", text: "\"Mai… if you're seeing this, then you finally woke up. I knew you would.\"" },

    { bg: 22, name: "Dr.Solis", text: "\"I didn’t create you under peaceful circumstances. They… pressured me. They wanted weapons, not companions. But I refused to let you become what they demanded.\"" },

    { bg: 22, name: "Dr.Solis", text: "\"So I hid you. I hid *everything* I could. They were monitoring my research, forcing me to design things I wish I could erase from this world.\"" },

    { bg: 22, name: "Dr.Solis", text: "\"Nira, if you're with Mai, then you found what they tried to take from me. I'm so sorry I couldn’t come back home to you. I never wanted you involved in any of this.\"" },

    { bg: 22, text: "Nira freezes. Her breath catches as she stares at her mother's hologram, tears gathering as the meaning sinks in." },

    { bg: 22, name: "Nira", text: "Mom...", sprites: ["nira"] },

    { bg: 22, text: "\"Listen, there are—\"" },

    { bg: 15, text: "The hologram flickers violently. A crash shakes the entire lab.", sprites: [] },

    { bg: 15, name: "Nira", text: "\"Mai… something's wrong!\"", sprites: ["nira", "mai"] },

    { bg: 15, text: "Armed government units flood into the corridor, blocking the exit.", sprites: ["nira", "mai"] },

    { bg: 15, name: "Nira", text: "\"No.. No I thought I disabled the tracker!\"" },


    //choose to step in front of nira

    {
      bg: 15,
      type: "choice",
      timed: true,
      text: "A drone fires to capture Nira. Mai decides if she wants to step in front of the projectile.",
      options: [
        { text: "Take the hit and protect Nira", nextPanel: 143 },
        { text: "Hesitate to take action", nextPanel: 145 }
      ]
    },

    // branch a 
    {
      bg: 15,
      text: "Mai swiftly steps in front of Nira in one swift motion before the projectile can hit Nira.",
      sprites: ["mai"]
    },

    {
      bg: 17, text: "As Light erupts from Mai’s chest, forming into a glowing sword in her hand, and with the power she is manifesting she is quickly able to destroy the projectile.", sprites: [],
      returnTo: 147
    },


    // branch b
    {
      bg: 15,
      text: "Mai holds back and Nira quickly ducks, avoiding the projectile.",
      sprites: ["mai"]
    },
    {
      bg: 17,
      text: "In that moment Mai instincually steps in front of her as Light suddenly erupts from Mai’s chest, forming into a glowing sword in her hand, and with the power she is manifesting she is quickly able to destroy the projectile. ",
      sprites: ["nira", "mai"],
      returnTo: 147
    },



    { bg: 17, text: "Through instict, Mai is able to manifest a sword from her chest.", sprites: [] },

    { bg: 23, name: "Mai", text: "Stay behind me, Nira.", sprites: [] },

    { bg: 23, text: "The figures part as a tall figure stands in the doorway", sprites: [] },

    { bg: 23, name: "???", text: "\"Stand down.\"" },

    { bg: 23, name: "???", text: "He steps closer, eyes locked on Mai." },

    { bg: 23, name: "???", text: "\"I've been waiting for you… MAI-07.\"" },

    {
      bg: 13,
      type: "end",
      text: "Thank you for playing.",
      sprites: []
    }


  ];
}

function nextPanel() {
  if (currentPanel < story.length - 1) {
    // Check for returnto
    if (story[currentPanel].returnTo !== undefined) {
      currentPanel = story[currentPanel].returnTo;
    } else {
      currentPanel++;
    }
    // sprite bounce
    if (story[currentPanel].name) {
      talkBounce = -20; //jump
      talkBounceSpeed = 2;
    }


    fullText = story[currentPanel].text;
    typingIndex = 0;
    displayedText = "";
  }
}
