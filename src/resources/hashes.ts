// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ModelsAPI from './models/models';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Look up a file and all its mirrors by SHA256.
 */
export class Hashes extends APIResource {
  /**
   * Return every known mirror of a file (`files`) and every model that uses
   * it (`models`), keyed by the file's SHA256 hash. Repo-host mirrors
   * (tensorfiles, huggingface, modelscope) appear in `files` but contribute
   * no entries to `models` (they have no model pages).
   *
   * Never errors on a miss: an unknown hash returns empty `files` and `models`.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<HashRetrieveResponse> {
    return this._client.get(path`/sha256/${id}`, options);
  }
}

export interface HashRetrieveResponse {
  /**
   * Every known mirror of the file (post-promotion).
   */
  files: Array<HashRetrieveResponse.File>;

  /**
   * Each model that uses this file (one per platform/model/version).
   */
  models: Array<ModelsAPI.Model>;
}

export namespace HashRetrieveResponse {
  /**
   * One location where a file (by SHA256) is hosted. The mirror list may be
   * deliberately trimmed: when a paid TensorFiles mirror exists and few other
   * sources do, competing mirrors are hidden to funnel downloads to TensorFiles.
   */
  export interface File {
    /**
     * Set if the file was removed from this source (kept as a tombstone).
     */
    deleted_at: string | null;

    filename: string | null;

    /**
     * Source requires authentication/acceptance to download.
     */
    is_gated: boolean;

    /**
     * Source is a paid host.
     */
    is_paid: boolean;

    model_id: string | null;

    model_version_id: string | null;

    /**
     * Platform slug hosting this mirror (e.g. civitai, huggingface, tensorfiles).
     */
    source: string;

    /**
     * Download or landing URL; may be a relative CivArchive path.
     */
    url: string;
  }
}

export declare namespace Hashes {
  export { type HashRetrieveResponse as HashRetrieveResponse };
}
