import fs from 'fs'
import path from 'path'

const getManifest = () => {
    try {
        const dir = path.join(__dirname, '../','/dist/manifest.json')
        return JSON.parse(fs.readFileSync(dir, 'utf8'))
    } catch (error) {
        return{
            "main.css": '/assets/main.css',
            "main.js": '/js/main.js'
        }
    }
}

export default getManifest