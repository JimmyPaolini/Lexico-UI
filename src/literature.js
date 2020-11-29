const books = (num, prefix) => new Array(num).fill()
    .map((_,i) => ({
        title: `book ${i+1}.txt`,
        key: prefix + `/book ${i+1}.txt`
    }))

const literature = [
    {
      "title": "augustus",
      "subtitle": "caesar divi filius augustus",
      "children": [
        {
          "title": "res gestae divi augusti",
          "children": books(2, "augustus/res gestae divi augusti")
        }
      ]
    },
    {
      "title": "caesar",
      "subtitle": "gaius iulius caesar",
      "children": [
        {
          "title": "de bello africo.txt",
          "key": "caesar/de bello africo.txt"
        },
        {
          "title": "de bello alexandrino.txt",
          "key": "caesar/de bello alexandrino.txt"
        },
        {
          "title": "de bello civili",
          "children": books(3, "caesar/de bello civili")
        },
        {
          "title": "de bello gallico",
          "children": books(8, "caesar/de bello gallico")
        },
        {
          "title": "de bello hispaniensi.txt",
          "key": "caesar/de bello hispaniensi.txt"
        }
      ]
    },
    {
      "title": "ovid",
      "subtitle": "publius ovidius naso",
      "children": [
        {
          "title": "amores",
          "children": books(3, "ovid/amores")
        },
        {
          "title": "ars amatoria",
          "children": books(3, "ovid/ars amatoria")
        },
        {
          "title": "ex ponto",
          "children": books(4, "ovid/ex ponto")
        },
        {
          "title": "fasti",
          "children": books(6, "ovid/fasti")
        },
        {
          "title": "heroides",
          "children": books(21, "ovid/heroides")
        },
        {
          "title": "ibis.txt",
          "key": "ovid/ibis.txt"
        },
        {
          "title": "metamorphoses",
          "children": books(15, "ovid/metamorphoses")
        },
        {
          "title": "remedia amoris.txt",
          "key": "ovid/remedia amoris.txt"
        },
        {
          "title": "tristia",
          "children": books(5, "ovid/tristia")
        }
      ]
    },
    {
      "title": "virgil",
      "subtitle": "publius vergilius maro",
      "children": [
        {
          "title": "aeneid",
          "children": books(12, "virgil/aeneid")
        },
        {
          "title": "eclogues",
          "children": books(10, "virgil/eclogues")
        },
        {
          "title": "georgicon",
          "children": books(4, "virgil/georgicon")
        }
      ]
    }
  ]

export default literature;