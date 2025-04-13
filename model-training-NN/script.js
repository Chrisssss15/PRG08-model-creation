import posedata from './testdata.json' with {type: 'json'};

const statusDiv = document.getElementById("status");

let nn; //Neural Network object

function startTraining(){
    statusDiv.textContent = "Training Neural Network..."; 
    ml5.setBackend("webgl"); //

    nn = ml5.neuralNetwork({
        task: 'classification',
        debug: true,
        layers: [
            { type: 'dense', units: 32, activation: 'relu' },
            { type: 'dense', units: 32, activation: 'relu' },
            { type: 'dense', units: 4, activation: 'softmax' }
        ],
        learningRate: 0.01,
    });

    console.log(`adding ${posedata.length} poses`);

    for(let pose of posedata){
        // console.log(pose);
        nn.addData(pose.data, {label:pose.label});
    }

    nn.normalizeData(); //
    nn.train({epochs: 130}, finishedTraining);

}


function finishedTraining(){
    statusDiv.textContent = "Training Complete!";
    console.log("Training Complete");
    nn.save(); // Save the model

    let demopose = posedata[10].data;
    // nn.classify(demopose, (result) => {
    //     console.log(`I think this pose is a ${result[0].label}`);
    //     console.log(`I am ${result[0].confidence.toFixed(2)* 100} % sure`);

    // });

}

startTraining();