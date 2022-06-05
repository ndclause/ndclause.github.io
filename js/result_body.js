// Copyright (c) 2022 ndclause on GitHub. All rights reserved.
// The file has no license: https://choosealicense.com/no-permission/#for-users
//
// Not using TypeScript/[your favorite bundler]/[your favorite framework], since
// frontend tech stacks come and go. This website is not complex anyway.

import {assertExists, findVersionsInDecreasingOrder, protectedDecodeUri, UrlParams, BaseLicenseOptions} from './common.js';

/** @type {!Array<string>} */
const ALL_VERSIONS_IN_DECREASING_ORDER = findVersionsInDecreasingOrder();

const searchParams = new URLSearchParams(window.location.search);

const chosenVersion = searchParams.get(UrlParams.VERSION);
if (chosenVersion) {
  let foundVersion = null;
  for (const version of ALL_VERSIONS_IN_DECREASING_ORDER) {
    const element = assertExists(
      document.querySelector(`div[data-version="content_${version}"]`));
    if (version === chosenVersion) {
      element.style.display = "block";
      foundVersion = version;
    } else {
      element.style.display = "none";
    }
  }
  if (foundVersion) {
    const topBanner =
        assertExists(document.querySelector("div#page_top_banner"));
    if (foundVersion !== ALL_VERSIONS_IN_DECREASING_ORDER[0]) {
      topBanner.innerText =
        `The license text version shown here (${foundVersion}) is not the ` +
        `most recent (${ALL_VERSIONS_IN_DECREASING_ORDER[0]}).`;
      topBanner.style.display = "block";
    } else {
      topBanner.innerText = "";
      topBanner.style.display = "none";
    }
  } else {
    const contentHolder =
      assertExists(document.querySelector('div#nd_content_holder'));
    contentHolder.innerHTML =
      `<span>Error: license version ${chosenVersion} is not found.</span>`;
    contentHolder.classList.add('error_param');
  }
} else {
  const contentHolder =
    assertExists(document.querySelector('div#nd_content_holder'));
  contentHolder.innerHTML =
    `<span>Error: no version selected; did you copy the URL in full?.</span>`;
  contentHolder.classList.add('error_param');
}

const changeDateInput = searchParams.get(UrlParams.CHANGE_DATE);
if (changeDateInput) {
  const valueSpan = assertExists(
    document.querySelector('p#change_date_readonly span'));
  const decodeReturn = protectedDecodeUri(changeDateInput);
  if (decodeReturn.ok) {
    const decoded = decodeReturn.decoded;
    if (((/\d{4,}-\d{2}-\d{2}/.test(decoded)) && !isNaN(Date.parse(decoded)))) {
      valueSpan.innerHTML = decoded;
      valueSpan.classList.remove('init_param');
      valueSpan.classList.remove('error_param');
    } else {
      valueSpan.innerHTML = `invalid yyyy-mm-dd: '${s}'`;
      valueSpan.classList.remove('init_param');
      valueSpan.classList.add('error_param');
    }
  } else {
    valueSpan.innerHTML = `unable to decode: '${changeDateInput}'`;
    valueSpan.classList.remove('init_param');
    valueSpan.classList.add('error_param');
  }
}

/**
* @param {string} fetchUrl
* @param {!HTMLSpanElement} nameSpan
*/
async function displayBaseLicense(fetchUrl, nameSpan) {
  try {
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      }
    });
    if (response.status < 300) {
      const json = await response.json();
      nameSpan.innerHTML = `${json.name}<a id="link_to_license" target="_blank" href="${json.html_url}">↗</a>`;
      nameSpan.classList.remove('init_param');
      nameSpan.classList.remove('error_param');
      const baseLicenseDiv = assertExists(
        document.querySelector('div#base_license_body'));
      baseLicenseDiv.innerText = json.body;
      baseLicenseDiv.style.display = "block";
    } else {
      nameSpan.innerHTML = `GitHub API returns status ${response.status}.`;
      nameSpan.classList.remove('init_param');
      nameSpan.classList.add('error_param');
    }
  } catch (e) {
    nameSpan.innerHTML = 'Unable to have a response from GitHub API.';
    nameSpan.classList.remove('init_param');
    nameSpan.classList.add('error_param');
  }
}

const baseLicenseInput = searchParams.get(UrlParams.BASE_LICENSE);
if (baseLicenseInput) {
  const valueSpan = assertExists(
    document.querySelector('p#base_license_readonly span'));
  const decodeReturn = protectedDecodeUri(baseLicenseInput);
  if (decodeReturn.ok) {
    const decoded = decodeReturn.decoded;
    if (decoded in BaseLicenseOptions) {
      const fetchUrl = `https://api.github.com/licenses/${decoded.toLowerCase()}`;
      displayBaseLicense(fetchUrl, valueSpan);  // Do not await it.
    } else {
      valueSpan.innerHTML = `unrecognized license identifier: '${decoded}'`;
      valueSpan.classList.remove('init_param');
      valueSpan.classList.add('error_param');
    }
  } else {
    valueSpan.innerHTML = `unable to decode: '${changeDateInput}'`;
    valueSpan.classList.remove('init_param');
    valueSpan.classList.add('error_param');
  }
}