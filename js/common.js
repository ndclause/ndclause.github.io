// Copyright (c) 2022 ndclause on GitHub. All rights reserved.
// The file has no license: https://choosealicense.com/no-permission/#for-users
//
// Not using TypeScript/[your favorite bundler]/[your favorite framework], since
// frontend tech stacks come and go. This website is not complex anyway.

// Do not change param keys as users depend on them.
export const UrlParams = {
  VERSION: 'v',
  BASE_LICENSE: 'to',
  CHANGE_DATE: 'on',
};

export function assertExists(obj) {
  if (obj) {
    return obj;
  }
  throw new Error('Non-array object is falsy.');
}

/**
 * @param {string} content
 * @returns {{decoded: string|null, ok: boolean}}
 */
export function protectedDecodeUri(content) {
  try {
    return {decoded: decodeURI(content), ok: true};
  } catch (e) { // URIError
    return {decoded: null, ok: false};
  }
}

/** @type {!Array<string>} */
export function findVersionsInDecreasingOrder() {
  const contentHolderDiv =
    assertExists(document.querySelector('div#nd_content_holder'));
  const versions = contentHolderDiv.dataset.versions.split(',');
  if (!versions.length) {
    throw new Error('Empty list.');
  }
  return versions;
}

class BaseLicenseInfo {
  /**
   * @param {string} name
   * @param {string} url
   */
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

// SPDX identifiers: https://spdx.org/licenses/
// SPDX has too many licenses; pick from https://choosealicense.com/appendix/
export const BaseLicenseOptions = {
  'MIT': new BaseLicenseInfo('MIT License', 'https://choosealicense.com/licenses/mit/'),
  'MIT-0': new BaseLicenseInfo('MIT No Attribution', 'https://choosealicense.com/licenses/mit-0/'),
  'Apache-2.0': new BaseLicenseInfo('Apache 2.0', 'https://choosealicense.com/licenses/apache-2.0/'),
  '0BSD': new BaseLicenseInfo('BSD Zero Clause License', 'https://choosealicense.com/licenses/0bsd/'),
  'BSD-2-Clause': new BaseLicenseInfo('BSD 2-Clause License', 'https://choosealicense.com/licenses/bsd-2-clause/'),
  'BSD-3-Clause': new BaseLicenseInfo('BSD 3-Clause License', 'https://choosealicense.com/licenses/bsd-3-clause/'),
  'BSD-3-Clause-Clear': new BaseLicenseInfo('BSD 3-Clause Clear License', 'https://choosealicense.com/licenses/bsd-3-clause-clear/'),
  'BSD-4-Clause': new BaseLicenseInfo('BSD 4-Clause License', 'https://choosealicense.com/licenses/bsd-4-clause/'), 
  'ISC': new BaseLicenseInfo('ISC License', 'https://choosealicense.com/licenses/isc/'),
  'MulanPSL-2.0': new BaseLicenseInfo('Mulan Permissive Software License 2.0', 'https://choosealicense.com/licenses/mulanpsl-2.0/'),
  'GPL-3.0': new BaseLicenseInfo('GNU GPL 3.0', 'https://choosealicense.com/licenses/gpl-3.0/'),
  'AGPL-3.0': new BaseLicenseInfo('GNU AGPL 3.0', 'https://choosealicense.com/licenses/agpl-3.0/'),
  'LGPL-3.0': new BaseLicenseInfo('GNU LGPL 3.0', 'https://choosealicense.com/licenses/lgpl-3.0/'),
  'CC0-1.0': new BaseLicenseInfo('CC0 1.0 Universal', 'https://choosealicense.com/licenses/cc0-1.0/'),
  'OSL-3.0': new BaseLicenseInfo('Open Software License 3.0', 'https://choosealicense.com/licenses/osl-3.0/'),
  'BSL-1.0': new BaseLicenseInfo('Boost Software License 1.0', 'https://choosealicense.com/licenses/bsl-1.0/'),
  'MPL-2.0': new BaseLicenseInfo('Mozilla Public License 2.0', 'https://choosealicense.com/licenses/mpl-2.0/'),
  'ODbL-1.0': new BaseLicenseInfo('Open Data Commons Open Database License 1.0', 'https://choosealicense.com/licenses/odbl-1.0/'),
  'NCSA': new BaseLicenseInfo('University of Illinois/NCSA Open Source License', 'https://choosealicense.com/licenses/ncsa/'),
  'Zlib': new BaseLicenseInfo('zlib License', 'https://choosealicense.com/licenses/zlib/'),
  'WTFPL': new BaseLicenseInfo('Do What The F*ck You Want To Public License', 'https://choosealicense.com/licenses/wtfpl/'),
  'The Unlicense': new BaseLicenseInfo('Unlicense', 'https://choosealicense.com/licenses/unlicense/'),
}