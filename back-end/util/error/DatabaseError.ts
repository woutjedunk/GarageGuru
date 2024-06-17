class DatabaseError extends Error {  
    constructor() {
      super("error database, see server log for details");
      this.name = "DatabaseError";
      this.stack = (<any> new Error()).stack;
    }
  }
  
  export default DatabaseError;