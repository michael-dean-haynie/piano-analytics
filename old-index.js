console.log('hello world')

let midiAccess = null; // global MIDIAccess object
function onMIDISuccess(midiAccess) {
    console.log("MIDI ready!");
    midiAccess = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
    console.log(midiAccess)
    listInputsAndOutputs(midiAccess)
    startLoggingMIDIInput(midiAccess)
}

function onMIDIFailure(msg) {
    console.error(`Failed to get MIDI access - ${msg}`);
}

function listInputsAndOutputs(midiAccess) {
    for (const entry of midiAccess.inputs) {
        const input = entry[1];
        console.log(
            `Input port [type:'${input.type}']` +
            ` id:'${input.id}'` +
            ` manufacturer:'${input.manufacturer}'` +
            ` name:'${input.name}'` +
            ` version:'${input.version}'`
        );
    }

    for (const entry of midiAccess.outputs) {
        const output = entry[1];
        console.log(
            `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
        );
    }
}

function onMIDIMessage(event) {
    let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
    for (const character of event.data) {
        str += `0x${character.toString(16)} `;
    }
    console.log(str);
}

function startLoggingMIDIInput(midiAccess) {
    midiAccess.inputs.forEach((entry) => {
        entry.onmidimessage = onMIDIMessage;
    });
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
