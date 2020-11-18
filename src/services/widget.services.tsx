import { Widget } from '../interfaces/widget.interface';
import { auth, db } from '../firebase.config';
import { User } from '../interfaces/user.interface';

const widgetsCollection = db.collection('widgets');

export const getUsersWidgets = (): Promise<Widget[]> => new Promise(((resolve, reject) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      widgetsCollection.where('author', '==', user.uid).get().then((querySnapshot) => {
        const data: Widget[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as Widget);
        });
        resolve(data);
      });
    } else {
      reject(new Error('No user found!'));
    }
  });
}));

export const getWidget = (widgetId: string): Promise<Widget> => new Promise<Widget>(((resolve, reject) => {
  widgetsCollection
    .doc(widgetId)
    .get().then((querySnapshot) => {
      if (querySnapshot.exists) {
        resolve({
          ...querySnapshot.data(),
          id: querySnapshot.id,
        } as Widget);
      } else {
        reject(new Error('Widget not found'));
      }
    });
}));

export const updateWidgetInformation = (
  widgetId: string,
  data: Partial<Widget>,
): Promise<void > => widgetsCollection.doc(widgetId).update(data);

export const getCommunityWidgets = (
  limit: number,
  startingName?: string,

): Promise<Widget[]> => new Promise((resolve) => {
  const startingQuery = widgetsCollection
    .where('isPublished', '==', true)
    .orderBy('name')
    .limit(limit);

  let finishedQuery;

  if (startingName) {
    finishedQuery = startingQuery.startAt(startingName).get();
  } else {
    finishedQuery = startingQuery.get();
  }

  finishedQuery.then((querySnapshot) => {
    const data: Widget[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id } as Widget);
    });
    resolve(data);
  });
});

export const saveWidget = (
  widgetId: string,
  widget: Partial<Widget>,
): Promise<void> => widgetsCollection.doc(widgetId).update(widget);

export const cloneWidget = (
  currentUser: User,
  widget: Widget,
): Promise<any> => widgetsCollection.add({
  ...widget,
  name: `${widget.name} Clone`,
  author: currentUser.id,
  authorName: currentUser.displayName,
  likes: 0,
  isPublished: false,
});

export const deleteWidget = (widgetId: string) => widgetsCollection.doc(widgetId).delete();
