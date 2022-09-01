const fs = require('fs')

class Contenedor{

    constructor (archivo) {
        this.archivo = archivo
    }

    async save (item) {
        let data
        try {
            data = await fs.promises.readFile(`./${this.archivo}`)
            data = JSON.parse(data)
        } catch (e) {
            data = []
        }
        const lastItem = data[data.length - 1]

        let id = 1

        if (lastItem) {
            id = lastItem.id + 1
        }

        item .id = id
        
        data.push(item)

        return fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(data, null, 2))
    }

    async getById (id) {
        let data
        try {
            data = await fs.promises.readFile(`./${this.archivo}`)
            data = JSON.parse(data)
        } catch (error) {
            return []
        }

        return data.find(item => item.id === id)
    }

    async getRandom (id) {
        let data
        try {
            data = await fs.promises.readFile(`./${this.archivo}`)
            data = JSON.parse(data)
        } catch (error) {
            return []
        }

        return data.find(item => Math.floor(Math.random() * data.length))
    }
    
    async getAll () {
        try {
            const data = await fs.promises.readFile(`./${this.archivo}`, "utf-8")
            return JSON.parse(data);
        } catch (error) {
            return []
        }
    }

    async deleteById (id) {
        let data
        try {
          data = await fs.promises.readFile(`./${this.archivo}`)
          data = JSON.parse(data)
        } catch (error) {
            return []
        }
    
        const productIndex = data.findIndex(item => item.id === id)
    
        if (productIndex === -1) {
          return
        }
    
        data.splice(productIndex, 1)
    
        return fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(data, null, 2))
    }

    async deleteAll () {
        return fs.promises.writeFile(`./${this.archivo}`, '')
    }
}

;(async () => {
    const contenedor = new Contenedor('productos.txt')

    //const random = await contenedor.getRandom()
    //console.log(random)

    //const product = await contenedor.getById(1)
    //console.log(product)
    
    //const products = await contenedor.getAll()
    //console.log(products)
    
    //await contenedor.deleteById(5)

    //await contenedor.deleteAll()
})()

module.exports = Contenedor;