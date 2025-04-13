# Model Creation

Deze map bevat de onderdelen waarin het AI-model wordt opgebouwd.

## 📂 data-collector
Hierin wordt data verzameld met behulp van MediaPipe. De verzamelde data worden opgeslagen in localstorage vervolgens kan je exporteren (copy object) naar JSON-bestand

## 📂 model-training-NN
Met behulp van ml5.js wordt hier een Neural Network getraind op de verzamelde data. Na training wordt het model opgeslagen (model.json + model_meta.json + model.weights.bin), zodat deze later kan worden gebruikt accurancy en prediction

## 📂 accurancy
Laadt het getrainde model in en gebruikt live webcam-data om voorspellingen te doen. Optioneel kun je hiermee ook de nauwkeurigheid testen met testdata.

