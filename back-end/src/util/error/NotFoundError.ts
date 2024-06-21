class DatabaseError extends Error {  
    constructor(msg: string) {
      super(msg);
      this.name = "NotFoundError";
      this.stack = (<any> new Error()).stack;
    }
  }
  
  export default DatabaseError;