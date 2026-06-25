// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ModelsAPI from './models';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Browse and fetch models per platform.
 */
export class Versions extends APIResource {
  /**
   * Fetch a model resolved to a specific version. Identical shape to
   * `models.retrieve`, but `version` is the requested `version_id`.
   */
  retrieve(
    platform: string,
    modelId: string,
    versionId: string,
    options?: RequestOptions,
  ): APIPromise<ModelsAPI.Model> {
    return this._client.get(path`/${platform}/models/${modelId}/versions/${versionId}`, options);
  }
}
