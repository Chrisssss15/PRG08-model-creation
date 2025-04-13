import testdata from './testdata.json' with { type: 'json' };

let nn;

const logButton = document.getElementById("logButton")
const resultDiv = document.getElementById("result")

logButton.addEventListener("click", (e) => calculateLetter(e));



function createNeuralNetwork() {
    ml5.setBackend('webgl');
    nn = ml5.neuralNetwork({task: 'classification', debug: true});

    const option = {
        model: "model/model.json",
        metadata: "model/model_meta.json",
        weights: "model/model.weights.bin"

    }

    nn.load(option, () => {;
        console.log("Model loaded!");
    });
}


async function calculateLetter() {
    let c = 0;
    let total = testdata.length;

    for (let pose of testdata) { // loop door alle poses
        const poseArray = pose.data; // haal de data van de pose
        const result = await classifyAsync(poseArray); //Het model doet een voorspelling over welke pose het denkt dat dit is.
        console.log(result.label, pose.label);
        if (result.label == pose.label) {
            c += 1 ; // als de voorspelling klopt, tel 1 op bij c
        }
    }
    showInBrowser(total, c);

}

function classifyAsync(input) {
    return new Promise((resolve, reject) => {
        nn.classify(input, (result) => { // Geef input aan het model
            if (result && result[0]) {
                resolve(result[0]); // bij een goed resultaat
            } else {
                reject(new Error("No result found")); // bij geen result
            }
        });
    });
}

function showInBrowser(total, c) {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `${c} / ${total} are correct! Accruacy is ${Math.round((c / total) * 100)}%`;
}


createNeuralNetwork();
