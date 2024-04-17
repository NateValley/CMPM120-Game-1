class Start extends Scene {
    create() {
        // Access a string
        const key1 = "Credits";
        console.log(this.engine.storyData[key1]);
        console.log(this.engine.storyData.Credits);

        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.DialogueOptions) {
            for(let dialogueOption of locationData.DialogueOptions) {
                this.engine.addChoice(dialogueOption.Text, dialogueOption);
            }
        }

        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            if (choice.Target == "Worm_Dig")
            {
                compostKey = true;
            }

            if (choice.Target == "Centipede_Entry" && compostKey)
            {
                this.engine.gotoScene(Location, "Centipede_Entry2");
            }

            if (choice.Target == "Shrimp_Find")
            {
                quartzKey = true;
            }

            this.engine.show("&gt; "+choice.Text+"<br><br>");
            this.engine.gotoScene(Location, choice.Target);

        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');

// if compostKey is true, allows passage past Centipede in Centipede_Entry Location
let compostKey = false;
let quartzKey = false;