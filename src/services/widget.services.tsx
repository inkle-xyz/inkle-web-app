import { Widget } from '../interfaces/widget.interface';
import { auth, db } from '../firebase.config';

const widgetsCollection = db.collection('widgets');

export const getUsersWidgets = (): Promise<Widget[]> => new Promise(((resolve, reject) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      widgetsCollection.where('owner', '==', user.uid).get().then((querySnapshot) => {
        const data: Widget[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as Widget);
        });
        resolve(data);
      });
    } else {
      reject(Error('No user found!'));
    }
  });
}));

export const getWidget = (widgetId: string): Promise<Widget> => new Promise<Widget>(((resolve) => {
  widgetsCollection.doc(widgetId).get().then((querySnapshot) => resolve(querySnapshot.data() as Widget));
}));

export const updateWidgetInformation = (
  widgetId: string,
  data: Partial<Widget>,
): Promise<void > => widgetsCollection.doc(widgetId).update(data);
