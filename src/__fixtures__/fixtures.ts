export interface NextScene {
    nextSceneId?: number;
    choiceText?: string;
    itemIds?: number[];
}
export interface Scene {
    _id: number;
    type?: string;
    storyId: number;
    hpChange: number;
    goldChange: number;
    text: string;
    nextScene: NextScene[];
    itemIds?: number[];
}

export const scenes: Scene[] = [
{
    _id: 1,
    type: 'initial',
    storyId: 1,
    hpChange: 0,
    goldChange: 0,
    text: "You wake up on a deserted island. You see smoke rising in the distance. What do you do?",
    nextScene: [
        {
            nextSceneId: 2,
            choiceText: "Head towards the smoke."
        },
        {
            nextSceneId: 3,
            choiceText: "Stay put and wait for rescue."
        },
        {
            nextSceneId: 3,
            choiceText: "Stay put and wait for rescue."
        }
    ]
},
{
    _id: 2,
    storyId: 1,
    hpChange: 0,
    goldChange: 0,
    text: "You head towards the smoke and find a tribe of natives. They welcome you and offer to help you leave the island.",
    nextScene: [
        {
            nextSceneId: 4,
            choiceText: "Leave the island."
        }
    ]
},
{
    _id: 3,
    storyId: 1,
    hpChange: 0,
    goldChange: 0,
    text: "You wait for rescue, but after several days, no one comes. You start to run out of food and water. What do you do?",
    nextScene: [
        {
            nextSceneId: 5,
            choiceText: "Search for food and water."
        },
        {
            nextSceneId: 6,
            choiceText: "Build a shelter and wait for rescue."
        }
    ]
},
{
    _id: 4,
    type: 'end',
    storyId: 1,
    hpChange: 0,
    goldChange: 0,
    text: "The natives help you build a raft and give you directions to the nearest inhabited island. You set out and eventually make it back home.",
    nextScene: [],
    itemIds:[2]
},
{
    _id: 5,
    storyId: 1,
    hpChange: -10,
    goldChange: 0,
    text: "You search for food and water, but end up getting lost in the wilderness. You eventually find your way back to your shelter, but you're weak and hungry.",
    nextScene: [
        {
            nextSceneId: 6,
            choiceText: "Wait."
        }
    ]
},
{
    _id: 6,
    type: 'end',
    storyId: 1,
    hpChange: -20,
    goldChange: 0,
    text: "You build a shelter and wait for rescue. After several more days, you are finally rescued, but you are weak and dehydrated.",
    nextScene: []
},
{
    _id: 7,
    type: 'end',
    storyId: 1,
    hpChange: 0,
    goldChange: 0,
    text: "You return home and resume your life, grateful for the experience and the lessons you learned.",
    nextScene: []
},
{
    _id: 8,
    type: 'initial',
    storyId: 2,
    hpChange: 0,
    goldChange: 0,
    text: "You come across a fork in the road. One path leads to a dark and ominous forest, while the other leads to a bustling town. Which way will you go?",
    nextScene: [
        {
            nextSceneId: 9,
            choiceText:"Take the path through the forest."
        },
        {
            nextSceneId: 10,
            choiceText:"Head to the town."
        }
    ]       
},
{
    _id: 9,
    storyId: 2,
    hpChange: -20,
    goldChange: -5,
    text: "As you make your way through the forest, you stumble upon a group of goblins. They attack you without warning, and you are forced to defend yourself.",
    nextScene: [
        {
            nextSceneId: 11,
            choiceText: "Fight!"
        }
    ]
    },
    {
    _id: 10,
    storyId: 2,
    hpChange: 0,
    goldChange: 10,
    text: "You arrive in the town, which is bustling with activity. You see a merchant selling goods on the side of the road. Do you want to buy something?",
    nextScene: [
        {
            nextSceneId: 12,
            choiceText: "Buy something from the merchant.",
            itemIds: [3]
        },
        {
            nextSceneId: 13,
            choiceText: "Ignore the merchant and keep exploring the town."
        }
    ]
},
{
    _id: 11,
    storyId: 2,
    hpChange: -10,
    goldChange: -5,
    text: "After defeating the goblins, you notice a cave entrance nearby. Do you want to investigate?",
    nextScene: [
        {
            nextSceneId: 14,
            choiceText: "Explore the cave."
        },
        {
            nextSceneId: 15,
            choiceText: "Continue on your way."
        }
    ]
},
{
    _id: 12,
    type: 'end',
    storyId: 2,
    hpChange: 0,
    goldChange: -20,
    text: "You buy something from the merchant, but it turns out to be a fake. You feel cheated, but you learn an important lesson about trusting strangers.",
    nextScene: []
},
{
    _id: 13,
    storyId: 2,
    hpChange: 0,
    goldChange: 5,
    text: "You explore the town further and find a hidden alleyway. You notice a small, unassuming door. Do you want to investigate?",
    nextScene: [
        {
            nextSceneId: 17,
            choiceText: "Open the door and go inside"
        },
        {
            nextSceneId: 18,
            choiceText: "Leave the door alone and keep exploring.",
        },
    ]
},
{
    _id: 14,
    storyId: 2,
    hpChange: -10,
    goldChange: -10,
    text: "As you explore the cave, you encounter a pack of wolves. They are fierce and aggressive, and you must fight for your life.",
    nextScene: [
        {
            nextSceneId: 15,
            choiceText:"Take the path through the forest."
        }
    ]
},
{
    _id: 15,
    type: 'end',
    storyId: 2,
    hpChange: 0,
    goldChange: 2,
    text: "You fight and win against the wolfs! Time to take another step!",
    nextScene: []
}  
]