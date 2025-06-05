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
    
    $.ajax({
        url: "/city/CreateModalForm?countryId=" + countryId,
        type: 'get',
        success: function (response) {
            $("#DivCreateDialog").html(response);
            ShowCreateModalForm();
        }
    });

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
    var preview = document.getElementById('PreviewPhoto');

    if (this.files && this.files[0]) {
        preview.src = URL.createObjectURL(this.files[0]);
        preview.style.display = 'block';
    }

    $(this).next('.custom-file-label').html(fileName);
    document.getElementById('PhotoUrl').value = fileName;
});

function ShowCreateModalForm() { 
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
    FillCountries("lstCountryId"); 
}

function refreshCityList() {
    var btnBack = document.getElementById('dupBackBtn');
    btnBack.click();
    var lstCountryCtrl = document.getElementById('lstCountryId');
    FillCities(lstCountryCtrl, "lstCityId");
}

function FillCountries(lstCountryId) {
    var lstCountries = $("#" + lstCountryId);
    lstCountries.empty();

    lstCountries.append($('<option/>', {
        value: null,
        text: "Select Country" 
    }));

    $.getJSON('/Country/GetCountries', function (countries) { 
        if (countries != null && !jQuery.isEmptyObject(countries)) {
            $.each(countries, function (index, country) {
                lstCountries.append($('<option/>', {
                    value: country.value,
                    text: country.text
                }));
            });
        }

    });
    return;
}

function getCountries() {
    fetch('/Country/GetCountries')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('countrySelect');
            select.innerHTML = '';
            data.forEach(country => {
                const option = new Option(country.name, country.id);
                select.add(option);
            });
        });
}

document.addEventListener('DOMContentLoaded', function () {
    getCountries();

    document.getElementById('countrySelect').addEventListener('change', function () {
        const countryId = this.value;
        if (countryId) {
            fetch(`/City/GetCitiesByCountry?countryId=${countryId}`)
                .then(response => response.json())
                .then(data => {
                    const citySelect = document.getElementById('citySelect');
                    citySelect.innerHTML = '';
                    data.forEach(city => {
                        const option = new Option(city.name, city.id);
                        citySelect.add(option);
                    });
                });
        }
    });
});
