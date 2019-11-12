import React from "react";
import { Subject } from "rxjs";

const mainSubject = new Subject();

export const publish = data => mainSubject.next(data);

export class Subscriber extends React.Component {
  unsub = null;
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.unsub = mainSubject.subscribe(data => this.setState({ data }));
  }

  componentWillUnmount() {
    this.unsub.unsubscribe();
  }
  
  render() {
    return this.props.children(this.state.data);
  }
}
