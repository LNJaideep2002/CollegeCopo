var xl = require("xlsx");
const generatefile = (noofcos, exam, examtotalmark, file, reqdata, user, tar, conames123) => {
    var cos = {}
    for (i = 1; i <= noofcos; i++) {
        cos["cos" + i] = cos["cos" + i] = { value: [], noofstabtar: 0, perofatt: 0, attlevel: 0, coatt: 0, poattyorn: "n" };
    }
    var target = tar
    console.log(target);
    //value={regno:0,mark:10}
    var filename = ""
    // storing data from assesment 1 to co1,co2
    for (i = 0; i < file.length; i++) {
        if (file[i].search("Assessment1") != -1)
            filename = file[i];
    }

    var wb1 = xl.readFile("./public/" + filename); // reading data of assessment 1
    var ws1 = wb1.Sheets["Sheet1"];
    var dataas = xl.utils.sheet_to_json(ws1);

    // console.log(dataas)
    for (i = 0; i < dataas.length; i++) {
        cos["cos1"].value.push({ reg: dataas[i].Register, mark: dataas[i].Mark / 2 })
        cos["cos2"].value.push({ reg: dataas[i].Register, mark: dataas[i].Mark / 2 })

    }
    // storing data from assesment 2 to co3,co4
    for (i = 0; i < file.length; i++) {
        if (file[i].search("Assessment2") != -1)
            filename = file[i];
    }
    var wb1 = xl.readFile("./public/" + filename); // reading data of assessment 2
    var ws1 = wb1.Sheets["Sheet1"];
    var dataas = xl.utils.sheet_to_json(ws1);

    // console.log(dataas)
    for (i = 0; i < dataas.length; i++) {
        cos["cos3"].value.push({ reg: dataas[i].Register, mark: dataas[i].Mark / 2 })
        cos["cos4"].value.push({ reg: dataas[i].Register, mark: dataas[i].Mark / 2 })

    }
    // storing data from assessment 3 to co1,co2,co3,co4,co5
    for (i = 0; i < file.length; i++) {
        if (file[i].search("Assessment3") != -1)
            filename = file[i];
    }
    var wb1 = xl.readFile("./public/" + filename); // reading data of assessment 3
    var ws1 = wb1.Sheets["Sheet1"];
    var dataas = xl.utils.sheet_to_json(ws1);

    // console.log("===")
    // console.log(dataas)

    for (i = 0; i < dataas.length; i++) { //adding assessment3 mark to co1,co2,co3,co4,co5

        for (j = 1; j <= 4; j++)
            cos["cos" + j].value[i].mark += dataas[i].Mark / 5
    }
    //adding assessment 3 mark to co5
    for (i = 0; i < dataas.length; i++) {
        cos["cos5"].value.push({ reg: dataas[i].Register, mark: dataas[i].Mark / 5 })

    }
    // storing data from assignment1 to co1,co2
    for (i = 0; i < file.length; i++) {
        if (file[i].search("Assignment1") != -1)
            filename = file[i];
    }
    var wb1 = xl.readFile("./public/" + filename); // reading data of assignment1
    var ws1 = wb1.Sheets["Sheet1"];
    var dataas = xl.utils.sheet_to_json(ws1);

    for (i = 0; i < dataas.length; i++) { //adding assignment1 mark to co1,co2
        cos["cos1"].value[i].mark += dataas[i].Mark / 2
        cos["cos2"].value[i].mark += dataas[i].Mark / 2
    }
    // storing data from assignment2 to co3,co4
    for (i = 0; i < file.length; i++) {
        if (file[i].search("Assignment2") != -1)
            filename = file[i];
    }
    var wb1 = xl.readFile("./public/" + filename); // reading data of assignment2
    var ws1 = wb1.Sheets["Sheet1"];
    var dataas = xl.utils.sheet_to_json(ws1);

    for (i = 0; i < dataas.length; i++) { //adding assignment2 mark to co3,co4
        cos["cos3"].value[i].mark += dataas[i].Mark / 2
        cos["cos4"].value[i].mark += dataas[i].Mark / 2
    }
    // storing data from assignment3 to co5
    for (i = 0; i < file.length; i++) {
        if (file[i].search("Assignment3") != -1)
            filename = file[i];
    }
    var wb1 = xl.readFile("./public/" + filename); // reading data of assignment3
    var ws1 = wb1.Sheets["Sheet1"];
    var dataas = xl.utils.sheet_to_json(ws1);
    // console.log(cos["cos5"].value)
    for (i = 0; i < dataas.length; i++) { //adding assignment3 mark to co5
        cos["cos5"].value[i].mark += dataas[i].Mark
    }
    // getting university mark
    for (i = 0; i < file.length; i++) {
        if (file[i].search("University") != -1)
            filename = file[i];
    }
    var wb1 = xl.readFile("./public/" + filename); // reading data of university
    var ws1 = wb1.Sheets["Sheet1"];
    var datau = xl.utils.sheet_to_json(ws1);

    var wbg = xl.readFile("./public/Grade.xlsx"); // reading grade.xlsx
    var wsg = wbg.Sheets["grade"];
    var datag = xl.utils.sheet_to_json(wsg);

    //converting grade to marks
    var universitymarks = []
    for (i = 0; i < datau.length; i++) {
        for (j in datag[0]) {

            if (datag[0][j] == datau[i].Mark) {
                if (j.search('100') != -1) {
                    universitymarks.push({ reg: datau[i].Register, mark: 100 });
                    break
                }
                if (j.search('90') != -1) {
                    universitymarks.push({ reg: datau[i].Register, mark: 90 });
                    break
                }
                if (j.search('80') != -1) {
                    universitymarks.push({ reg: datau[i].Register, mark: 80 });
                    break
                }
                if (j.search('70') != -1) {
                    universitymarks.push({ reg: datau[i].Register, mark: 70 });
                    break
                }
                if (j.search('60') != -1) {
                    universitymarks.push({ reg: datau[i].Register, mark: 60 });
                    break
                }
                if (j.search('0') != -1) {
                    universitymarks.push({ reg: datau[i].Register, mark: 0 });
                    break
                }
            }
            if (datau[i].Mark == 'AB') {
                universitymarks.push({ reg: datau[i].Register, mark: -1 });
                break
            }
            if (datau[i].Mark == 'WH') {
                universitymarks.push({ reg: datau[i].Register, mark: -1 });
                break
            }

        }
    }

    //remove students who are absent and withheld
    for (i = 0; i < universitymarks.length; i++) {
        if (universitymarks[i].mark == -1) {
            var reg = universitymarks[i].reg;
            universitymarks.splice(i, 1);
            for (j = 0; j < cos["cos1"].value.length; j++) {
                if (cos["cos1"].value[j].reg == reg) {
                    cos["cos1"].value.splice(j, 1)
                    cos["cos2"].value.splice(j, 1)
                    cos["cos3"].value.splice(j, 1)
                    cos["cos4"].value.splice(j, 1)
                    cos["cos5"].value.splice(j, 1)
                }
            }
        }
    }
    // no of st above avg which is as noofstabtar
    var totalavg = {
        uni: null,
        cos1: null,
        cos2: null,
        cos3: null,
        cos4: null,
        cos5: null,
    }
    var sum = 0;
    for (i = 0; i < universitymarks.length; i++) {
        sum += universitymarks[i].mark;
    }
    totalavg.uni = Number((sum / universitymarks.length).toFixed(1))
    for (i = 1; i <= 5; i++) {
        sum = 0;
        for (j = 0; j < cos["cos" + i].value.length; j++) {
            sum += cos["cos" + i].value[j].mark;
        }
        totalavg["cos" + i] = Number((sum / cos["cos" + i].value.length).toFixed(1))
    }
    var university = {
        noofabtar: 0,
        perofatt: 0,
        attlevel: 0
    }
    for (i = 0; i < universitymarks.length; i++) {
        if (universitymarks[i].mark > totalavg.uni)
            university.noofabtar++;
    }
    for (i = 1; i <= 5; i++) {
        for (j = 0; j < cos["cos" + i].value.length; j++) {
            if (cos["cos" + i].value[j].mark > totalavg["cos" + i]) {
                cos["cos" + i].noofstabtar++;
            }
        }
    }
    // calculating persentage of attainment
    university.perofatt = Number((university.noofabtar / (universitymarks.length / 100)).toFixed(1))
    for (i in cos) {
        cos[i].perofatt = Number((cos[i].noofstabtar / (universitymarks.length / 100)).toFixed(1));
    }
    // caluclate attainment level of uni and internal

    if (university.perofatt >= target)
        university.attlevel = 3
    else if (university.perofatt >= target - 10)
        university.attlevel = 2
    else if (university.perofatt >= target - 20)
        university.attlevel = 1

    for (i in cos) {
        if (cos[i].perofatt >= target)
            cos[i].attlevel = 3
        else if (cos[i].perofatt >= target - 10)
            cos[i].attlevel = 2
        else if (cos[i].perofatt >= target - 20)
            cos[i].attlevel = 1
    }
    // calculating % of co attainment and poattyorn
    for (i in cos) {
        cos[i].coatt = Number((university.attlevel * 0.8 + cos[i].attlevel * 0.2).toFixed(1))
        if (cos[i].coatt >= 2.5)
            cos[i].poattyorn = "Y"
        else
            cos[i].poattyorn = "N"
    }
    for (i = 0; i < file.length; i++) {
        if (file[i].search("Pos") != -1)
            filename = file[i];
    }
    var wbp = xl.readFile("./public/" + filename);
    var wsp = wbp.Sheets["Sheet1"];
    var datap = xl.utils.sheet_to_json(wsp);
    // to calculate poso attainment
    var poattaiment = {}; // po attaiment
    for (j in datap[0]) {
        var posum = 0; // to add and multiply
        var po1sum = 0; // to add the column po1
        for (i = 0; i < datap.length; i++)
            if (j != "COs") {
                posum += cos["cos" + (i + 1)].coatt * datap[i][j];
                po1sum += datap[i][j];
                if (po1sum == 0)
                    poattaiment[j] = 0.00
                else
                    poattaiment[j] = (posum / po1sum).toFixed(2);
            }
    }
    // console.log(poattaiment)

    // to prepare html file
    var fs = require("fs");
    const { join } = require("path");
    var html = fs.readFileSync("./headhtml.txt", { encoding: 'utf8', flag: 'r' });
    html = html.split("<dep>").join("" + reqdata.depart);
    html = html.split("<sem>").join("" + reqdata.semester);
    html = html.split("<sub>").join("" + reqdata.subject);
    html = html.split("<tar>").join("" + target);
    var conames = conames123;

    var conames2 = {
        cos1: conames.split("$")[1].split("^")[0],
        cos2: conames.split("$")[1].split("^")[1],
        cos3: conames.split("$")[1].split("^")[2],
        cos4: conames.split("$")[1].split("^")[3],
        cos5: conames.split("$")[1].split("^")[4]
    }
    html += `<div style="margin:20px 0px 0px 100px"><table style="border-collapse: collapse;"><tr><td style=" border: 2px solid black;padding: 5px;">CO1</td><td style=" border: 2px solid black;padding: 5px;">${conames2.cos1}</td></tr><tr><td style=" border: 2px solid black;padding: 5px;">CO2</td><td style=" border: 2px solid black;padding: 5px;">${conames2.cos2}</td></tr><tr><td style=" border: 2px solid black;padding: 5px;">CO3</td><td style=" border: 2px solid black;padding: 5px;">${conames2.cos3}</td></tr><tr><td style=" border: 2px solid black;padding: 5px;">CO4</td><td style=" border: 2px solid black;padding: 5px;">${conames2.cos4}</td></tr><tr><td style=" border: 2px solid black;padding: 5px;">CO5</td><td style=" border: 2px solid black;padding: 5px;">${conames2.cos5}</td></tr></table></div >`


    html += `<div style="margin:20px 0px 0px 10px" ><table style="border-collapse: collapse;font-size:12px" ><tr><td style=" border: 2px solid black;padding: 5px;" rowspan='1'>S.No</td><td style=" border: 2px solid black;padding: 5px;" rowspan='1'>Register No</td><td style=" border: 2px solid black;padding: 5px;"  colspan='2'>Assessment-1 </td><td style=" border: 2px solid black;padding: 5px;" colspan='2'>Assessment-2 </td><td style=" border: 2px solid black;padding: 5px;">Assessment-3 </td><td style=" border: 2px solid black;padding: 5px;" colspan='2' >Assignment-1 </td><td style=" border: 2px solid black;padding: 5px;" colspan='2'>Assignment-2 </td><td style=" border: 2px solid black;padding: 5px;">Assignment-3 </td><td style=" border: 2px solid black;padding: 5px;" colspan='2'>University</td><td style=" border: 2px solid black;padding: 5px;" colspan='5'>Marks For CO Outcomes</td><tr>`
    html += `<tr><td style=" border: 2px solid black;padding: 5px;"></td><td style=" border: 2px solid black;padding: 5px;"></td><td style=" border: 2px solid black;padding: 5px;">CO1</td><td style=" border: 2px solid black;padding: 5px;">CO2</td><td style=" border: 2px solid black;padding: 5px;">CO3</td><td style=" border: 2px solid black;padding: 5px;">CO4</td><td style=" border: 2px solid black;padding: 5px;">CO1-CO5</td><td style=" border: 2px solid black;padding: 5px;">CO1</td><td style=" border: 2px solid black;padding: 5px;">CO2</td> <td style = " border: 2px solid black;padding: 5px;" >CO3</td ><td style=" border: 2px solid black;padding: 5px;">CO4</td><td style=" border: 2px solid black;padding: 5px;">CO5</td>      <td style=" border: 2px solid black;padding: 5px;">G</td><td style=" border: 2px solid black;padding: 5px;">M</td><td style=" border: 2px solid black;padding: 5px;">CO1</td><td style=" border: 2px solid black;padding: 5px;">CO2</td><td style=" border: 2px solid black;padding: 5px;">CO3</td><td style=" border: 2px solid black;padding: 5px;">CO4</td><td style=" border: 2px solid black;padding: 5px;">CO5</td></tr>`
    var asses = {
        co1: [],
        co2: [],
        co3: [],
        co4: []
    }
    for (i = 1; i <= 2; i++) {
        for (n = 0; n < file.length; n++) {
            if (file[n].search("Assessment" + i) != -1)
                filename = file[n];
        }

        var wb1 = xl.readFile("./public/" + filename); // reading data of assessment 1
        var ws1 = wb1.Sheets["Sheet1"];
        var dataas = xl.utils.sheet_to_json(ws1);
        for (j = 0; j < dataas.length; j++) {
            for (k = 0; k < universitymarks.length; k++) {
                if (dataas[j].Register == universitymarks[k].reg) {
                    if (i == 1) {
                        asses.co1.push(dataas[j].Mark / 2);
                        asses.co2.push(dataas[j].Mark / 2);
                    } else {
                        asses.co3.push(dataas[j].Mark / 2);
                        asses.co4.push(dataas[j].Mark / 2);
                    }
                }
            }
        }
    }
    var assign = {
        co1: [],
        co2: [],
        co3: [],
        co4: [],
        co5: []
    }
    for (i = 1; i <= 2; i++) {
        for (n = 0; n < file.length; n++) {
            if (file[n].search("Assignment" + i) != -1)
                filename = file[n];
        }

        var wb1 = xl.readFile("./public/" + filename); // reading data of assessment 1
        var ws1 = wb1.Sheets["Sheet1"];
        var dataas = xl.utils.sheet_to_json(ws1);
        for (j = 0; j < dataas.length; j++) {
            for (k = 0; k < universitymarks.length; k++) {
                if (dataas[j].Register == universitymarks[k].reg) {
                    if (i == 1) {
                        assign.co1.push(dataas[j].Mark / 2);
                        assign.co2.push(dataas[j].Mark / 2);
                    } else {
                        assign.co3.push(dataas[j].Mark / 2);
                        assign.co4.push(dataas[j].Mark / 2);
                    }
                }
            }
        }
    }
    for (n = 0; n < file.length; n++) {
        if (file[n].search("Assignment3") != -1)
            filename = file[n];
    }
    var wb1 = xl.readFile("./public/" + filename); // reading data of assessment 1
    var ws1 = wb1.Sheets["Sheet1"];
    var dataas = xl.utils.sheet_to_json(ws1);
    for (j = 0; j < dataas.length; j++) {
        for (k = 0; k < universitymarks.length; k++) {
            if (dataas[j].Register == universitymarks[k].reg) {
                assign.co5.push(dataas[j].Mark)
            }
        }
    }
    var unihtml = []
    for (i = 0; i < datau.length; i++) {
        for (j = 0; j < universitymarks.length; j++) {
            if (datau[i].Register == universitymarks[j].reg) {
                unihtml.push(datau[i].Mark);
            }
        }
    }
    var ass3html = [];
    for (n = 0; n < file.length; n++) {
        if (file[n].search("Assessment3") != -1)
            filename = file[n];
    }
    var wb1 = xl.readFile("./public/" + filename); // reading data of assessment 1
    var ws1 = wb1.Sheets["Sheet1"];
    var dataas = xl.utils.sheet_to_json(ws1);
    for (j = 0; j < dataas.length; j++) {
        for (k = 0; k < universitymarks.length; k++) {
            if (dataas[j].Register == universitymarks[k].reg) {
                ass3html.push(dataas[j].Mark)
            }
        }
    }
    for (i = 0; i < universitymarks.length; i++) {
        html += `<tr><td style=" border: 2px solid black;padding: 5px;">${i + 1}</td><td style=" border: 2px solid black;padding: 5px;">${universitymarks[i].reg}</td><td style=" border: 2px solid black;padding: 5px;">${asses.co1[i]}</td><td style=" border: 2px solid black;padding: 5px;">${asses.co2[i]}</td><td style=" border: 2px solid black;padding: 5px;">${asses.co3[i]}</td><td style=" border: 2px solid black;padding: 5px;">${asses.co4[i]}</td><td style=" border: 2px solid black;padding: 5px;">${ass3html[i]}</td><td style=" border: 2px solid black;padding: 5px;">${assign.co1[i]}</td><td style=" border: 2px solid black;padding: 5px;">${assign.co2[i]}</td><td style=" border: 2px solid black;padding: 5px;">${assign.co3[i]}</td><td style=" border: 2px solid black;padding: 5px;">${assign.co4[i]}</td><td style=" border: 2px solid black;padding: 5px;">${assign.co5[i]}</td><td style=" border: 2px solid black;padding: 5px;">${unihtml[i]}</td><td style=" border: 2px solid black;padding: 5px;">${universitymarks[i].mark}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos1"].value[i].mark}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos2"].value[i].mark}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos3"].value[i].mark}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos4"].value[i].mark}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos5"].value[i].mark}</td>`
    }
    html += '</table><div>'

    var attainval = ["No. of students scored above target", "% of Attainment", "Attainment Level", "CO Attainment(20% of Internal + 80% of External)"]
    html += `<div style="margin:20px 0px 0px 50px"><table  style="border-collapse: collapse;font-size:12px"><tr><td style=" border: 2px solid black;padding: 5px;"></td><td style=" border: 2px solid black;padding: 5px;">University M</td><td style=" border: 2px solid black;padding: 5px;">CO1</td><td style=" border: 2px solid black;padding: 5px;">CO2</td><td style=" border: 2px solid black;padding: 5px;">CO3</td><td style=" border: 2px solid black;padding: 5px;">CO4</td><td style=" border: 2px solid black;padding: 5px;">CO5</td><tr>`
    html += `<tr><td style=" border: 2px solid black;padding: 5px;">${attainval[0]}</td><td style=" border: 2px solid black;padding: 5px;">${university.noofabtar}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos1"].noofstabtar}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos2"].noofstabtar}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos3"].noofstabtar}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos4"].noofstabtar}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos5"].noofstabtar}</td></tr>`
    html += `<tr><td style=" border: 2px solid black;padding: 5px;">${attainval[1]}</td><td style=" border: 2px solid black;padding: 5px;">${university.perofatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos1"].perofatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos2"].perofatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos3"].perofatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos4"].perofatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos5"].perofatt}</td></tr>`
    html += `<tr><td style=" border: 2px solid black;padding: 5px;">${attainval[2]}</td><td style=" border: 2px solid black;padding: 5px;">${university.attlevel}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos1"].attlevel}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos2"].attlevel}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos3"].attlevel}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos4"].attlevel}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos5"].attlevel}</td></tr>`
    html += `<tr><td style=" border: 2px solid black;padding: 5px;">${attainval[3]}</td><td style=" border: 2px solid black;padding: 5px;">-</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos1"].coatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos2"].coatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos3"].coatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos4"].coatt}</td><td style=" border: 2px solid black;padding: 5px;">${cos["cos5"].coatt}</td></tr>`
    html += `</table></div>`



    html += `<table style = 'border-collapse:collapse;table-layout:fixed;width:auto;margin-top: 20px;' ><tr>`;



    var noofpos = -1;
    for (j in datap[0]) {
        if (j.search("S") == -1)
            noofpos++
    }
    noofpos += 4;
    // console.log(noofpos)
    html += `<td class='border' colspan='${noofpos}' style="text-align: center">Calculation of PO Attainment</td></tr><tr><td class="border">CO's</td><td class="border">CO Attainment</td><td class="border">Attainment</td>`
    for (j in datap[0]) {
        if (j.search("S") == -1 && j != "COs")
            html += `<td class='border'>${j}</td>`
    }
    html += "</tr>";
    for (i = 1; i <= noofcos; i++) {
        html += "<tr>"
        html += `<td class='border'>${"CO" + i}</td>`
        html += `<td class='border'>${cos["cos" + i].coatt}</td>`
        html += `<td class='border'>${cos["cos" + i].poattyorn}</td>`
        for (j in datap[i - 1])
            if (j.search("S") == -1 && j != "COs")
                html += `<td class='border'>${datap[i - 1][j]}</td>`
        html += "</tr>"
    }
    html += "<tr><td class='border' style='text-align: center' colspan='3'>PO Attainment</td>";
    for (j in poattaiment) {
        if (j.search("S") == -1 && j != "COs")
            html += `<td class='border'>${poattaiment[j]}</td>`
    }
    html += "</tr></table><table style='border-collapse:collapse;table-layout:fixed;width:auto;margin-top: 20px;'><tr>";
    var noofpos = 0;
    for (j in datap[0]) {
        if (j.search("S") != -1)
            noofpos++
    }
    noofpos += 3;
    html += `<td class='border' colspan='${noofpos}' style="text-align: center">Calculation of PSO Attainment</td></tr><tr><td class="border">CO's</td><td class="border">CO Attainment</td><td class="border">Attainment</td>`
    for (j in datap[0]) {
        if (j.search("S") != -1)
            html += `<td class='border'>${j}</td>`
    }
    html += "</tr>";
    for (i = 1; i <= noofcos; i++) {
        html += "<tr>"
        html += `<td class='border'>${"CO" + i}</td>`
        html += `<td class='border'>${cos["cos" + i].coatt}</td>`
        html += `<td class='border'>${cos["cos" + i].poattyorn}</td>`
        for (j in datap[i - 1])
            if (j.search("S") != -1)
                html += `<td class='border'>${datap[i - 1][j]}</td>`
        html += "</tr>"
    }
    html += "</table>"

    filename = user.username + "_" + reqdata.depart + "_" + reqdata.batch + "_" + reqdata.semester + "_" + reqdata.subject + ".html";
    fs.writeFileSync(filename, html, "utf8");
    return filename
}
exports.generatefile = generatefile;
