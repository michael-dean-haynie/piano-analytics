import {WebMidi} from "webmidi";

WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => console.error(err));

function onEnabled() {
    console.log('WebMidi Enabled')

    // Inputs
    console.log('Inputs:')
    WebMidi.inputs.forEach(input => console.log(`${input.manufacturer} | ${input.name}`));

    // Outputs
    console.log('Outputs:')
    WebMidi.outputs.forEach(output => console.log(`${output.manufacturer} | ${output.name}`));

    // const myInput = WebMidi.getInputByName("MPK mini Play mk3");
    const myInput = WebMidi.getInputByName("CASIO USB-MIDI");
    myInput.addListener("midimessage", e => {
        console.log(`${e.timestamp} | ${e.type} | ${e.message.type} | [${e.message.data}]`);
    })
}
