import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry, timeout } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class HttpService {

    className: string;
    public httpErrorSubject: Subject<any>;
    public httpErrorObservable: Observable<any>;
    httpTimeout: number;
    retryCount: number;
    private requests: any;

    /**
     *
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
        this.className = 'HttpService';
        this.httpTimeout = 90000; // 180 second is load balance timeout & it throws gateway timeout exception
        this.retryCount = 1;
        this.requests = {};
        this.httpErrorSubject = new Subject<any>();
        this.httpErrorObservable = this.httpErrorSubject.asObservable();
    }


    /**
     *
     * @param {string} path
     * @param {number} _timeout
     * @param {number} _retry
     * @param {boolean} suppressErrors
     * @returns {Observable<any>}
     */
    get(path: string, params?: HttpParams, _timeout?: number, _retry?: number, suppressErrors?: boolean): Observable<any> {
        return this.httpClientGet(path, params, _timeout, _retry);
    }

    /**
     *
     * @param {string} path
     * @param data
     * @param {number} _timeout
     * @param {number} _retry
     * @param {boolean} suppressErrors
     * @returns {Observable<any>}
     */
    post(path: string, data: any, _timeout?: number, _retry?: number, suppressErrors?: boolean): Observable<any> {
        return this.httpClientPost(path, data, _timeout, _retry);
    }

    /**
     *
     * @param {string} path
     * @param data
     * @param {number} _timeout
     * @param {number} _retry
     * @param {boolean} suppressErrors
     * @returns {Observable<any>}
     */
    put(path: string, data ? : any, params?: HttpParams, _timeout?: number, _retry?: number, suppressErrors?: boolean): Observable<any> {
        return this.httpClientPut(path, data, params, _timeout, _retry);
    }
    /**
     *
     * @param {string} path
     * @param {number} _timeout
     * @param {number} _retry
     * @param {boolean} suppressErrors
     * @returns {Observable<any>}
     */

    delete(path: string, params?: HttpParams, _timeout?: number, _retry?: number, suppressErrors?: boolean): Observable<any> {
        return this.httpClientDelete(path, params, _timeout, _retry);
    }
    /**
     *
     * @param {string} path
     * @param {number} _timeout
     * @param {number} _retry
     * @returns {Observable<any>}
     */

    private httpClientGet(path: string, params?: HttpParams, _timeout?: number, _retry?: number): Observable<any> {
        let timeoutV = this.httpTimeout;
        if (!isNullOrUndefined(_timeout)) {
            timeoutV = _timeout;
        }
        let retryC = this.retryCount;
        if (!isNullOrUndefined(_retry)) {
            retryC = _retry;
        }
        const options = { params: params ? params : {} };
        return this.httpClient.get<any>(path, options).pipe(
            retry(retryC),
            timeout(timeoutV));
    }

    /**
     *
     * @param {string} path
     * @param data
     * @param {number} _timeout
     * @param {number} _retry
     * @returns {Observable<any>}
     */
    private httpClientPost(path: string, data: any, _timeout?: number, _retry?: number): Observable<any> {
        let timeoutV = this.httpTimeout;
        if (!isNullOrUndefined(_timeout)) {
            timeoutV = _timeout;
        }

        let retryC = this.retryCount;
        if (!isNullOrUndefined(_retry)) {
            retryC = _retry;
        }
        return this.httpClient.post<any>(path, data).pipe(
            retry(retryC),
            timeout(timeoutV));
    }

    /**
   *
   * @param {string} path
   * @param data
   * @param {number} _timeout
   * @param {number} _retry
   * @returns {Observable<any>}
   */
    private httpClientPut(path: string, data: any, params?: HttpParams, _timeout?: number, _retry?: number): Observable<any> {
        let timeoutV = this.httpTimeout;
        if (!isNullOrUndefined(_timeout)) {
            timeoutV = _timeout;
        }

        let retryC = this.retryCount;
        if (!isNullOrUndefined(_retry)) {
            retryC = _retry;
        }
        const options = { params: params ? params : {} };
        return this.httpClient.put<any>(path, data, options).pipe(
            retry(retryC),
            timeout(timeoutV));
    }
    /**
     *
     * @param {string} path
     * @param {number} _timeout
     * @param {number} _retry
     * @returns {Observable<any>}
     */

    private httpClientDelete(path: string, params?: HttpParams, _timeout?: number, _retry?: number): Observable<any> {
        let timeoutV = this.httpTimeout;
        if (!isNullOrUndefined(_timeout)) {
            timeoutV = _timeout;
        }
        let retryC = this.retryCount;
        if (!isNullOrUndefined(_retry)) {
            retryC = _retry;
        }
        const options = { params: params ? params : {} };
        return this.httpClient.delete<any>(path, options).pipe(
            retry(retryC),
            timeout(timeoutV));
    }
}

