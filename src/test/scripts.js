const keys = ["augustus/res gestae divi augusti/book 1.txt","augustus/res gestae divi augusti/book 2.txt","caesar/de bello africo.txt","caesar/de bello alexandrino.txt","caesar/de bello civili/book 1.txt","caesar/de bello civili/book 2.txt","caesar/de bello civili/book 3.txt","caesar/de bello gallico/book 1.txt","caesar/de bello gallico/book 2.txt","caesar/de bello gallico/book 3.txt","caesar/de bello gallico/book 4.txt","caesar/de bello gallico/book 5.txt","caesar/de bello gallico/book 6.txt","caesar/de bello gallico/book 7.txt","caesar/de bello gallico/book 8.txt","caesar/de bello hispaniensi.txt","ovid/amores/book 1.txt","ovid/amores/book 2.txt","ovid/amores/book 3.txt","ovid/ars amatoria/book 1.txt","ovid/ars amatoria/book 2.txt","ovid/ars amatoria/book 3.txt","ovid/ex ponto/book 1.txt","ovid/ex ponto/book 2.txt","ovid/ex ponto/book 3.txt","ovid/ex ponto/book 4.txt","ovid/fasti/book 1.txt","ovid/fasti/book 2.txt","ovid/fasti/book 3.txt","ovid/fasti/book 4.txt","ovid/fasti/book 5.txt","ovid/fasti/book 6.txt","ovid/heroides/book 1.txt","ovid/heroides/book 10.txt","ovid/heroides/book 11.txt","ovid/heroides/book 12.txt","ovid/heroides/book 13.txt","ovid/heroides/book 14.txt","ovid/heroides/book 15.txt","ovid/heroides/book 16.txt","ovid/heroides/book 17.txt","ovid/heroides/book 18.txt","ovid/heroides/book 19.txt","ovid/heroides/book 2.txt","ovid/heroides/book 20.txt","ovid/heroides/book 21.txt","ovid/heroides/book 3.txt","ovid/heroides/book 4.txt","ovid/heroides/book 5.txt","ovid/heroides/book 6.txt","ovid/heroides/book 7.txt","ovid/heroides/book 8.txt","ovid/heroides/book 9.txt","ovid/ibis.txt","ovid/metamorphoses/book 1.txt","ovid/metamorphoses/book 10.txt","ovid/metamorphoses/book 11.txt","ovid/metamorphoses/book 12.txt","ovid/metamorphoses/book 13.txt","ovid/metamorphoses/book 14.txt","ovid/metamorphoses/book 15.txt","ovid/metamorphoses/book 2.txt","ovid/metamorphoses/book 3.txt","ovid/metamorphoses/book 4.txt","ovid/metamorphoses/book 5.txt","ovid/metamorphoses/book 6.txt","ovid/metamorphoses/book 7.txt","ovid/metamorphoses/book 8.txt","ovid/metamorphoses/book 9.txt","ovid/remedia amoris.txt","ovid/tristia/book 1.txt","ovid/tristia/book 2.txt","ovid/tristia/book 3.txt","ovid/tristia/book 4.txt","ovid/tristia/book 5.txt","vergil/aeneid/book 1.txt","vergil/aeneid/book 10.txt","vergil/aeneid/book 11.txt","vergil/aeneid/book 12.txt","vergil/aeneid/book 2.txt","vergil/aeneid/book 3.txt","vergil/aeneid/book 4.txt","vergil/aeneid/book 5.txt","vergil/aeneid/book 6.txt","vergil/aeneid/book 7.txt","vergil/aeneid/book 8.txt","vergil/aeneid/book 9.txt","vergil/eclogues/book 1.txt","vergil/eclogues/book 10.txt","vergil/eclogues/book 2.txt","vergil/eclogues/book 3.txt","vergil/eclogues/book 4.txt","vergil/eclogues/book 5.txt","vergil/eclogues/book 6.txt","vergil/eclogues/book 7.txt","vergil/eclogues/book 8.txt","vergil/eclogues/book 9.txt","vergil/georgicon/book 1.txt","vergil/georgicon/book 2.txt","vergil/georgicon/book 3.txt","vergil/georgicon/book 4.txt"];

function parseLiterature(keys) {
    const literature = [];
    for (const key of keys) {
        let current = literature;
        for (const title of key.split("/")) {
            let target = current.find(obj => obj.title === title);
            if (!target) {
                if (title.match(/.*\.txt/)) target = {title};
                else target = {title, children: []};
                current.push(target);
            }
            current = target.children;
        }
    }
    console.log(JSON.stringify(literature, null, 2));
    return literature;
}

parseLiterature(keys);