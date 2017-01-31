
class Definition{
    objects:[Object]
}

class _Object{
    highlight:number;
    attributes:[Attribute]
}

class Attribute{
    name:string;
    type:Types;
    objectType:string;
    array:boolean;
}

enum Types{'boolean','date','dropdown','number','object','pointer','text'}

