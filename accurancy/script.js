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

    for (let pose of testdata) {
        const poseArray = pose.data;
        const result = await classifyAsync(poseArray);
        console.log(result.label, pose.label);
        if (result.label == pose.label) {
            c += 1 ;
        }
    }
    showInBrowser(total, c);

}

function classifyAsync(input) {
    return new Promise((resolve, reject) => {
        nn.classify(input, (result) => {
            if (result && result[0]) {
                resolve(result[0]);
            } else {
                reject(new Error("No result found"));
            }
        });
    });
}

function showInBrowser(total, c) {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `${c} / ${total} are correct! Accruacy is ${Math.round((c / total) * 100)}%`;
}


createNeuralNetwork();
