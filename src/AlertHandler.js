function alertHandler() {
  this.alertShow = true;
  this.alertMode = "with-success";
  this.alertMessage = "Transaction Successful, you rock!";
  setTimeout(() => {
    this.alertShow = false;
  }, 7000);
}

export default alertHandler;
