import ApplicationSerializer from './application';
const { set } = Ember;

export default ApplicationSerializer.extend({ 
  normalizeResponse(store, primaryModelClass, { ListBucketResult: { Contents: payload } }, id, requestType) {
    let mungedPayload = payload;
    mungedPayload.forEach(docObject => {
      const newDocObject = docObject;
      const objectPath = newDocObject['Key']['_text'].split('/');
      const fileName = objectPath[objectPath.length - 1];
      const fileNameNoExt = objectPath[objectPath.length - 1].split('.')[0];
      const tags = objectPath.slice(0, objectPath.length - 1);
      newDocObject.type = 'dataset'
      newDocObject.id = newDocObject['ETag']['_text'];
      newDocObject.menu3 = fileNameNoExt.replace(/_/g, ' ').capitalize();
      newDocObject.table_name = fileNameNoExt;
      newDocObject.tags = tags;
      newDocObject.filename = fileName;
    });

    mungedPayload = mungedPayload.filter(docObject => {
      return docObject['Size']['_text'] !== "0";
    });

    return this._super(store, primaryModelClass, mungedPayload, id, requestType);
  },
});
