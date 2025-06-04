// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function ShowCountryCreateModal() {
    $.ajax(
        {
            url: "/country/CreateModalForm",
            type: 'get',
            success: function (response) {
                $("#DivCreateDialog").html(response);
                ShowCountryCreateForm();
            }
        });
    return;
}

function ShowCityCreateModal() {

    var lstCountryCtrl = document.getElementById('lstCountryId');
    var countryId = lstCountryCtrl.options[lstCountryCtrl.selectedIndex].value;

    $.ajax(
        {
            url: "/city/CreateModalForm?countryid=" + countryid,
            type: 'get',
            success: function (response) {
                $("#DivCreateDialog").html(response);
                ShowCreateModalForm();
            }
        });
    return;
}

function FillCities(lstCountryCtrl, lstCityId) {
    var lstCities = $("#" + lstCityId);
    lstCities.empty();

    lstCities.append($('<option/>',
        {
            value: null,
            text: "Select City"
        }));

    var selectedCountry = lstCountryCtrl.options[lstCountryCtrl.selectedIndex].value;

    if (selectedCountry != null && selectedCountry != '') {
        $.getJSON('/Customer/getcitiesbycountry', { countryId: selectedCountry }, function (cities) {
            if (cities != null && !jQuery.isEmptyObject(cities)) {
                $.each(cities, function (index, city) {
                    lstCities.append($('<option/>',
                        {
                            value: city.value,
                            text: city.text
                        }));
                });
            };
        });
    }
    return;
}

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();

    document.getElementById('PreviewPhoto').src = window.URL.createObjectURL(this.files[0]);

    document.getElementById('PhotoUrl').value = fileName;
});

function ShowCreateModalFrom() {
    $("#DivCreateDialogHolder").modal('show');
    return;
}

function submitModalForm() {
    var btnSubmit = document.getElementById('btnSumbit');
    btnSubmit.click();
}

function refreshCountryList() {
    var btnBack = document.getElementById('dupBackBtn');
    btnBack.click();
    FillCoutries("lstCountryId");
}

function refreshCityList() {
   var btnBack = document.getElementById('dupBackBtn');
    btnBack.click();
    var lstCountryCtrl = document.getElementById('lstCountryId');
    FillCities(lstCountryCtrl, "lstCity");
}

function FillCoutries(lstCountrId) {

    var lstCountries = $("#" + lstCityId);
    lstCountries.empty();

    lstCountries.append($('<option/>',
        {
            value: null,
            text: "Select City"
        }));

    var selectedCountry = lstCountryCtrl.options[lstCountryCtrl.selectedIndex].value;

    $.getJSON('/country/GetCountries', { countryId: selectedCountry }, function (cities) {
        if (cities != null && !jQuery.isEmptyObject(cities)) {
            $.each(cities, function (index, city) {
                lstCities.append($('<option/>',
                    {
                        value: city.value,
                        text: city.text
                    }));
            });
        };

    }
    return;
}
