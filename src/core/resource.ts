// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Civarchive } from '../client';

export abstract class APIResource {
  protected _client: Civarchive;

  constructor(client: Civarchive) {
    this._client = client;
  }
}
