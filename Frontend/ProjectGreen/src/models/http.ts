export class ResponseState implements IResponseState {
  public hasError: boolean = false;
  public isLoading: boolean = false;
  public errorMessage: string = "";
}

export class ItemResponseState<T> extends ResponseState implements IItemResponseState<T> {
  constructor(public item: T) {
    super();
  }
}

export class ListResponseState<T> extends ResponseState implements IListResponseState<T> {
  constructor(public list: T[]) {
    super();
  }
}

export class HttpResponse<T = any> implements IHttpResponse {
  constructor(
    public data: T,
    public success: boolean,
    public errorMessage: string = ""
  ) {}
}

export class VoidHttpResponse implements IVoidHttpResponse {
 constructor(
   public data: string,
   public success: boolean,
   public errorMessage: string = ""
 ) {}
}

export interface IVoidHttpResponse {
  data: string
  success: boolean
  errorMessage?: string
}

export interface IHttpResponse<T = any> {
  data: T
  success: boolean
  errorMessage?: string
}

export interface IResponseState {
  hasError: boolean
  isLoading: boolean
  hasLoaded?: boolean
  errorMessage?: string
}

export interface IListResponseState<T> extends IResponseState {
  list: T[]
}

export interface IItemResponseState<T> extends IResponseState {
  item: T
}
