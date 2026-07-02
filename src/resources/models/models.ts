// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VersionsAPI from './versions';
import { Versions } from './versions';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Browse and fetch models per platform.
 */
export class Models extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Fetch a single model with its latest version resolved into `version`, plus the
   * full list of its versions in `versions`.
   */
  retrieve(platform: string, modelID: string, options?: RequestOptions): APIPromise<Model> {
    return this._client.get(path`/${platform}/models/${modelID}`, options);
  }

  /**
   * Browse the newest model releases on a platform, paginated. This endpoint lists
   * newest-first only; it does not currently accept search, type, or base-model
   * filters (use the website search for richer filtering).
   *
   * Only platforms that have model pages are supported. Repo-host platforms
   * (huggingface, tensorfiles, modelscope, modelscope_cn) respond `404`.
   */
  list(
    platform: string,
    query: ModelListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ModelListResponse> {
    return this._client.get(path`/${platform}/models`, { query, ...options });
  }
}

/**
 * A model with one resolved `version` and the list of all its `versions`.
 * Additional platform-specific fields may be present (CivitAI responses also
 * include `comment_count`, `rating_count`, `nsfw_level`); only the documented
 * properties are part of the stable contract.
 */
export interface Model {
  /**
   * The model's identifier on its platform — the same opaque string used as the
   * `model_id` path parameter. Numeric-looking for CivitAI.
   */
  id: string;

  created_at: string;

  creator_id: string | null;

  creator_name: string | null;

  /**
   * Relative CivArchive path (relative to https://civarchive.com).
   */
  creator_url: string;

  creator_username: string | null;

  deleted_at: string | null;

  description: string | null;

  download_count: number | null;

  favorite_count: number;

  is_nsfw: boolean;

  name: string;

  platform: string;

  platform_name: string;

  rating: number;

  tags: Array<string>;

  type: string;

  updated_at: string;

  username: string;

  version: ModelVersion;

  versions: Array<ModelVersionRef>;
}

export interface ModelVersion {
  /**
   * Version id (opaque string).
   */
  id: string;

  allow_download: boolean;

  base_model: string;

  base_model_type: string | null;

  created_at: string;

  deleted_at: string | null;

  description: string | null;

  download_count: number | null;

  /**
   * Download URL; may be relative to https://civarchive.com.
   */
  download_url: string;

  favorite_count: number;

  files: Array<ModelVersion.File>;

  images: Array<ModelVersion.Image>;

  /**
   * Other platforms hosting the same model (version-level).
   */
  mirrors: Array<ModelVersion.Mirror>;

  name: string;

  /**
   * Absolute URL of this version on the source platform.
   */
  platform_url: string;

  rating: number;

  /**
   * Trained/trigger words.
   */
  trigger: Array<string> | null;

  updated_at: string;

  /**
   * Relative CivArchive path for this version's page.
   */
  url: string;

  /**
   * Cross-reference to the CivitAI model id, when known.
   */
  civitai_model_id?: number | null;

  /**
   * Cross-reference to the CivitAI version id, when known.
   */
  civitai_model_version_id?: number | null;
}

export namespace ModelVersion {
  /**
   * A file belonging to a version. CivitAI responses carry additional fields
   * (`type`, `download_url`, `model_id`, `model_name`, `model_version_id`,
   * `is_primary`, `is_nsfw`, `nsfw_level`, `created_at`, `updated_at`); only the
   * documented properties are guaranteed across platforms.
   */
  export interface File {
    /**
     * File id (opaque string).
     */
    id: string;

    deleted_at: string | null;

    mirrors: Array<File.Mirror>;

    name: string | null;

    /**
     * 64-char hex SHA256 of the file.
     */
    sha256: string | null;

    /**
     * File size in kilobytes.
     */
    size_kb: number;
  }

  export namespace File {
    /**
     * One location where a file (by SHA256) is hosted. The mirror list may be
     * deliberately trimmed: when a paid TensorFiles mirror exists and few other
     * sources do, competing mirrors are hidden to funnel downloads to TensorFiles.
     */
    export interface Mirror {
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

  /**
   * A preview image or video. CivitAI responses include extra fields (`image_url`,
   * `video_url`, width/height, etc.); only the documented properties are guaranteed.
   */
  export interface Image {
    id: number;

    /**
     * Full-resolution / original URL.
     */
    link: string;

    /**
     * `image` or `video`.
     */
    type: string;

    /**
     * Display URL.
     */
    url: string;
  }

  /**
   * A link to the same model on another platform (version-level).
   */
  export interface Mirror {
    /**
     * Model id on that platform.
     */
    id: string;

    name: string;

    platform: string;

    /**
     * Absolute URL on the source platform.
     */
    platform_url: string;

    /**
     * Relative CivArchive path to this model's page.
     */
    url: string;

    /**
     * Version id on that platform.
     */
    version_id: string;

    version_name: string;
  }
}

/**
 * A lightweight reference to one of a model's versions.
 */
export interface ModelVersionRef {
  /**
   * Version id (opaque string).
   */
  id: string;

  name: string;

  /**
   * Populated for CivitAI; used for per-version comment windowing.
   */
  created_at?: string;

  /**
   * Relative CivArchive path for the version's page.
   */
  url?: string;
}

export interface ModelListResponse {
  results: Array<ModelListResponse.Result>;

  /**
   * Estimated total matching documents (MeiliSearch estimate).
   */
  total_hits: number;
}

export namespace ModelListResponse {
  /**
   * A single entry from the search index (one per model release).
   */
  export interface Result {
    /**
     * Opaque search-index document id (not the model id). Use `model_id` /
     * `version_id` to address the detail endpoints.
     */
    id: string;

    download_count: number;

    is_nsfw: boolean;

    /**
     * Index document kind (typically `version`).
     */
    kind: string;

    name: string;

    platform: string;

    /**
     * Model type (e.g. Checkpoint, LORA).
     */
    type: string;

    /**
     * CivArchive path for this result.
     */
    url: string;

    base_model?: string;

    image_url?: string;

    /**
     * The model's id on its platform. Present on version results (`kind: version`);
     * pass with `platform` to the model detail endpoints.
     */
    model_id?: string;

    username?: string;

    /**
     * The version's id. Present on version results (`kind: version`).
     */
    version_id?: string;

    video_url?: string;
  }
}

export interface ModelListParams {
  /**
   * Page size (1–100).
   */
  limit?: number;

  /**
   * 1-based page number.
   */
  page?: number;
}
Models.Versions = Versions;

export declare namespace Models {
  export {
    type Model as Model,
    type ModelVersion as ModelVersion,
    type ModelVersionRef as ModelVersionRef,
    type ModelListResponse as ModelListResponse,
    type ModelListParams as ModelListParams,
  };

  export { Versions as Versions };
}
