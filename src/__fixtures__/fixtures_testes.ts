/*
  Ao gerar as aventuras parece ser bom explicar as seguintes regras ao ChatGPT:
  The i representes the id of the 'scene'

Got it, so you would like to replace i with _id to represent the ID of the scene, correct?



The "i" representes the id of the 'scene', keep using the 'i',but remember its an ID.
The "g" representes a gold change, some scenes should increase or decrease the gold.
The "h" representes health change, some scenes should increase or decrease the gold.
The gold and health should change based on the scene text.
I want you to know that the "n" json representes a next scene.
So inside the "n" json we have a nsid that represents the id of a next scene.
"c" representes the choice in the current scene, that text will affect what happens in the next scene with the id in "nsid"
With this in mind, write me a small adventure with 5 prompts, connected with the next scene ids and with a tematic text.
The adventures should ahve no more that X ids, meaning if I tell you to write me an adventure with 7 scenes, there should
never be a next scene id of 8, nor should there be a scene with the id 8.
The scenes that represent the end of an adventure should have the "n" json empty. The keys of the json should not be
between "".
Here is an example with 6 scenes that have 3 endings, but you can have less than 3 as long as there is at least 1 ending.
 {
    i: 1,
    h: 0,
    g: 0,
    t: "You find yourself lost in a dense forest. You notice two paths ahead of you. Which one do you choose?",
    n: [
      {
        nsid: 2,
        c: "Take the left path"
      },
      {
        nsid: 3,
        c: "Take the right path"
      }
    ]
  },
  {
    i: 2,
    h: 0,
    g: 0,
    t: "You come across a river. The water looks murky and deep. Do you attempt to cross it?",
    n: [
      {
        nsid: 4,
        c: "Attempt to cross the river"
      },
      {
        nsid: 5,
        c: "Look for another way around"
      }
    ]
  },
  {
    i: 3,
    h: 0,
    g: 0,
    t: "You find a small clearing in the forest. In the center of the clearing, there is a small cabin. Do you investigate?",
    n: [
      {
        nsid: 6,
        c: "Investigate the cabin"
      },
      {
        nsid: 5,
        c: "Leave the clearing and continue on"
      }
    ]
  },
  {
    i: 4,
    h: -10,
    g: -5,
    t: "You attempt to cross the river, but the current is too strong. You get swept downstream and lose 10 health and 5 gold.",
    n: []
  },
  {
    i: 5,
    h: 0,
    g: 0,
    t: "You find a hidden path that leads you out of the forest. You continue on your journey.",
    n: []
  },
  {
    i: 6,
    h: -5,
    g: 10,
    t: "The cabin is abandoned and run-down. You search around and find 10 gold, but you also contract a minor illness and lose 5 health.",
    n: []
  }, 

// Aventura:
  1 - 1 a 6 com 3 fins.
  2 - 1 a 7 
*/
export const scenes = [
  {
    i: 1,
    h: 0,
    g: 0,
    t: "You find yourself lost in a dense forest. You notice two paths ahead of you. Which one do you choose?",
    n: [
      {
        nsid: 2,
        c: "Take the left path"
      },
      {
        nsid: 3,
        c: "Take the right path"
      }
    ]
  },
  {
    i: 2,
    h: 0,
    g: 0,
    t: "You come across a river. The water looks murky and deep. Do you attempt to cross it?",
    n: [
      {
        nsid: 4,
        c: "Attempt to cross the river"
      },
      {
        nsid: 5,
        c: "Look for another way around"
      }
    ]
  },
  {
    i: 3,
    h: 0,
    g: 0,
    t: "You find a small clearing in the forest. In the center of the clearing, there is a small cabin. Do you investigate?",
    n: [
      {
        nsid: 6,
        c: "Investigate the cabin"
      },
      {
        nsid: 5,
        c: "Leave the clearing and continue on"
      }
    ]
  },
  {
    i: 4,
    h: -10,
    g: -5,
    t: "You attempt to cross the river, but the current is too strong. You get swept downstream and lose 10 health and 5 gold.",
    n: []
  },
  {
    i: 5,
    h: 0,
    g: 0,
    t: "You find a hidden path that leads you out of the forest. You continue on your journey.",
    n: []
  },
  {
    i: 6,
    h: -5,
    g: 10,
    t: "The cabin is abandoned and run-down. You search around and find 10 gold, but you also contract a minor illness and lose 5 health.",
    n: []
  }, 
  /* Aqui começa uma nova.*/
  {
    i: 1,
    h: -5,
    g: 0,
    text: "You are walking through a dark forest when suddenly you hear a rustling in the bushes. A small goblin jumps out and demands your gold.",
    n: [
      {
        nsid: 2,
        c: "Give the goblin your gold."
      },
      {
        nsid: 3,
        c: "Refuse to give the goblin your gold."
      }
    ]
  },
  {
    i: 2,
    h: 0,
    g: -5,
    text: "The goblin takes your gold and runs away. You continue on your journey.",
    n: [
      {
        nsid: 4,
        c: "Chase after the goblin and try to get your gold back."
      },
      {
        nsid: 5,
        c: "Let the goblin go and continue on your journey."
      }
    ]
  },
  {
    i: 3,
    h: -10,
    g: 0,
    text: "The goblin attacks you! You fight it off but not before it steals some of your health.",
    n: [
      {
        nsid: 6,
        c: "Continue on your journey, nursing your wounds."
      },
      {
        nsid: 7,
        c: "Hunt down the goblin and make it pay for attacking you."
      }
    ]
  },
  {
    i: 4,
    h: 0,
    g: 5,
    text: "You catch up to the goblin and demand your gold back. After a short argument, the goblin gives you back your gold and runs away.",
    n: [
      {
        nsid: 6,
        c: "Continue on your journey."
      },
      {
        nsid: 7,
        c: "Chase after the goblin and make it pay for stealing from you."
      }
    ]
  },
  {
    i: 5,
    h: 0,
    g: 0,
    text: "You let the goblin go and continue on your journey. As you walk, you find a small chest by the side of the path.",
    n: [
      {
        nsid: 6,
        c: "Open the chest and see what's inside."
      },
      {
        nsid: 7,
        c: "Leave the chest alone and continue on your journey."
      }
    ]
  },
  {
    i: 6,
    h: -5,
    g: 0,
    text: "You open the chest and find a poisonous spider inside. It bites you before you can react!",
    n: []
  },
  {
    i: 7,
    h: 0,
    g: 10,
    text: "You hunt down the goblin and defeat it in battle. You find a stash of gold and take it for yourself.",
    n: [
      {
        nsid: 6,
        c: "Continue on your journey."
      },
      {
        nsid: 5,
        c: "Let the goblin go and continue on your journey."
      }
    ]
  }
]