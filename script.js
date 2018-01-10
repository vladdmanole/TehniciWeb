$(document).ready(function () {

    //variabila in care se vor stoca raspunsurile alese
    var answers = {};
    //raspunsurile corecte la chestionar
    var chosenAnswers = {
        "tab-1": "radio1a",
        "tab-2": "radio2b",
        "tab-3": "radio3b",
        "tab-4": "radio4b"
    };

    //-----PLANET MODAL START-----

    $.each(planetInfo, function (index, planet) {
        $('#planet-container').append(
            `
            <div data-planet="${planet.id}" class="section-content">
            <h1> ${planet.name} </h1>
            <br> Change speed:
            <input type="text" class="speed" value="${planet.speed}">

            <form class="chooseOrbit" data-form="${planet.id}">
                <br>
                <input type="radio" name="orbit" checked="checked" id="orbit${index+1}" />
                <label for="orbit${index+1}">Clockwise Rotation</label>
                <br>
                <input type="radio" name="orbit" id="antiOrbit${index+1}" />
                <label for="antiOrbit${index+1}">Counter-Clockwise Rotation</label>
            </form>

            <button class="apply" type="button" data-submit="${planet.id}"> Apply </button>
        </div>
            `
        )
    });

    function showPlanetContent(planetId) {
        $('.section-content').removeClass('current');
        $("#planet-container div[data-planet=" + planetId + "]").addClass('current');
    }

    $('.planet-modal-menu .section-link').click(function () {
        showPlanetContent($(this).attr("data-section"))
    });

    $('.planet').click(function (event) {
        $('#planetModal').show();
        showPlanetContent(event.target.id);
    })
    //-----PLANET MODAL END-----

    // Adauga eveniment pentru deschiderea modalului Soare 
    $('#sun').click(function () {
        $('#sunModal').show();
    });

    //Asignarea valorilor raspunsurilor alese in variabila answers
    $(".radioAnswers").click(function () {
        answers[$(this).closest(".current").attr("id")] = this.id;
        $(this).closest(".answers").siblings(".nextButton").css("display", "inline-block");
        if ($(this).closest(".tab-content").is("#tab-4")) {
            $(this).closest(".answers").siblings(".submitButton").css("display", "inline-block");
        }
    });

    //Schimbarea taburilor prin actionarea butonului NEXT/PREVIOUS
    $(".nextButton, .prevButton").click(function (event) {
        $(".tab-content").removeClass("current");
        let tab = $($(this).closest(".tab-content"));
        switch (event.target.class) {
            case ".nextButton":
                tab.next(".tab-content").addClass("current");
            case ".prevButton":
                tab.prev("tab-content").addClass("current");
        }
    });

    //Evenimentul pentru actionarea butonului SUBMIT
    $(".submitButton").click(function () {
        var currentTab = $(this).closest(".tab-content");
        currentTab.removeClass("current");
        currentTab.next().addClass("current");

        var countCorrect = 0;
        for (var answer in answers) {
            if (answers[answer] == correctAnswers[answer]) {
                countCorrect++;
            }
        }

        $("#tab-5 .answers").append(`<h2>You have answered ${countCorrect}/4 questions correctly.</h2>`)
    });

    //Eveniment pentru interactiunea cu utilizatorul - alegerea orbitei si a vitezei planetelor
    $(".apply").click(function () {
        var planet = $(this).attr("data-submit");
        var orbit = $(this).siblings(".chooseOrbit").children("input[type=radio]:checked").attr("id");
        var speed = $(this).siblings(".speed").val();

        $('#' + planet).css("animation", orbit + " " + speed + "s linear infinite");
    });

    // UTILS

    // Adauga eveniment pentru inchiderea modalului la apasarea unei zone exterioare acestuia sau pe buton
    $('.modal, .close').click(function (event) {
        if ($(event.target).is($('.modal, .close')))
            $('.modal').hide();
    });

});