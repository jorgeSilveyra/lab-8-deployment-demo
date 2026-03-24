const { json } = require('stream/consumers');

class Configuration {

    content = new Map();

    // Must allow file path and filename configuration.
    // If file does not exist, it must be created when saved. _> use a try catch
    constructor(path,filename){
        this.path = path;
        this.filename = filename;
    }

    // stores or updates a value
    set(key, value ){
        this.key = key;
        this.value = value;

    }

    // returns a stored value. If value DNE, return undefined
    get(key){
        this.key = key;
    }

    // writes current state to file, overwrites previous file, uses proper try/catch
    save(){
        // make sure to create new file if this.filename DNE
    }

    // loads configuration from a file, clears existing in-memory data before loading
    load(){
        //use either loading and then using json.parse() from string or can load directly as a JSONObject
        Map.clear();
        const fs = require('fs');
        try {
            const data = fs.readFileSync(toString());
        }
        catch (error){
            console.error("File does not exist");
        }
    }

    // clears in memory data, reloads from file 
    reload(){

    }

    // updates the file path
    setPath(path){
        this.path = path;
    }

    // updates the file name
    setFilename(filename){
        this.filename = filename;
    }

    // helpers
    toString(){
        return this.path + "/" + this.fileName;
    }
}